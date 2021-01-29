import React, { useState, useCallback, useEffect, MouseEvent } from 'react'
import { useGetPagnationQuery } from '../../generated/types.d'
import { NextPage } from 'next'
import { Search } from '../../components/search/index'
import { PageIndex } from '../../components/pagination/index'

import {
  Top,
  Title,
  Main,
  Primary,
  Count,
  Text,
  Container,
  Whole,
  NextButton,
  Arrow,
  Page,
  PageNumber,
  PageArrow,
  ArrowNone,
  ConnectionMain,
  NextNumber,
  Line
} from '../../styles/pages/pagination/connection'
import { CommentUserName } from '../../components/comment/Name'
import { GettBlogImage } from '../../components/article/BlogImage'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { useRouter } from 'next/router'
import className from 'classnames'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Link from 'next/Link'

interface Props {}

const PagiNation: NextPage<Props> = () => {
  const router = useRouter()
  const [error, setError] = useState<string>()
  const [page, setNowPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(4)
  const [direction, setDirection] = useState<any>('ASC')
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  let nextpage
  let backpage
  const MatchingPattern: any = 'PARTIAL_MATCH'
  const title = router.query.connection
  const filtertext = String(title)

  // classNameActiveNumber

  const [numberclass, setNumberClass] = useState('number')
  let number4 = className(numberclass == 'number' ? 'number' : null)
  let number8 = className(numberclass == 'number8' ? 'number' : null)
  let number12 = className(numberclass == 'number12' ? 'number' : null)

  const handleNumber = (number: number, classNumber: string) => {
    setLimit(number)
    setNumberClass(classNumber)
  }

  // classNameActiveSort
  const [click, setClick] = useState('active')
  let asc = className(click == 'active' ? 'active' : null)
  let desc = className(click == 'none' ? 'active' : null)

  const { data, loading, fetchMore, refetch } = useGetPagnationQuery({
    variables: {
      // 文字列フィルタ条件
      filterWord: {
        filterWord: filtertext,
        matchingPattern: MatchingPattern
      },
      // ページング条件
      pageCondition: {
        nowPageNo: page,
        initialLimit: limit
      },
      // 並び替え条件
      edgeOrder: {
        direction: direction
      }
    },
    fetchPolicy: 'cache-and-network'
  })

  // Direction change render
  // useEffect(() => {
  //   if (!loading && data && refetch) {
  //     refetch({
  //       edgeOrder: {
  //         direction: direction
  //       }
  //     })
  //   }
  // }, [direction, refetch])

  const handleOnClick = (sort: string, name: string) => {
    setClick(name)
    setDirection(sort)
  }

  // NextPage function
  const handleRight = useCallback(async () => {
    // pagenumber + 1
    setNowPage(page + 1)
    if (data && !fetchMoreLoading) {
      setFetchMoreLoading(true)
      await fetchMore({
        variables: {
          pageCondition: {
            nowPageNo: page,
            forward: {
              first: limit,
              after: data.blogConnection.pageInfo.endCursor
            }
          }
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!previousResult && !fetchMoreResult) {
            return previousResult
          }
          const newEdges = fetchMoreResult.blogConnection.edges
          const pageInfo = fetchMoreResult.blogConnection.pageInfo
          return {
            blogConnection: {
              __typename: fetchMoreResult.blogConnection.__typename,
              ...previousResult.blogConnection,
              pageInfo,
              edges: [...newEdges]
            }
          }
        }
      })
      setFetchMoreLoading(false)
    }
  }, [data, fetchMore, fetchMoreLoading, loading])

  // PreviousPage function
  const handleLeft = useCallback(async () => {
    // pagenumber - 1
    setNowPage(page - 1)
    if (data && !fetchMoreLoading) {
      setFetchMoreLoading(true)
      await fetchMore({
        variables: {
          pageCondition: {
            nowPageNo: page,
            backward: {
              last: limit,
              before: data.blogConnection.pageInfo.startCursor
            }
          }
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!previousResult && !fetchMoreResult) {
            return previousResult
          }
          const newEdges = fetchMoreResult.blogConnection.edges
          const pageInfo = fetchMoreResult.blogConnection.pageInfo
          return {
            blogConnection: {
              ...previousResult.blogConnection,
              pageInfo,
              edges: [...newEdges]
            }
          }
        }
      })
      setFetchMoreLoading(false)
    }
  }, [data, fetchMore, fetchMoreLoading])

  // nextPage
  {
    data && !loading && data.blogConnection.pageInfo.hasNextPage
      ? (nextpage = (
          <Arrow className={'right'} onClick={handleRight}>
            <ArrowForwardIcon style={{ fontSize: 27, color: '#3D8BF2' }} />
          </Arrow>
        ))
      : data &&
        !loading &&
        !data.blogConnection.pageInfo.hasNextPage &&
        (nextpage = (
          <ArrowNone className={'right'}>
            <ArrowForwardIcon style={{ fontSize: 27, color: '#cccccc' }} />
          </ArrowNone>
        ))
  }

  // backPage
  {
    data && !loading && data.blogConnection.pageInfo.hasPreviousPage
      ? (backpage = (
          <Arrow onClick={handleLeft}>
            <ArrowBackIcon style={{ fontSize: 27, color: '#3D8BF2' }} />
          </Arrow>
        ))
      : data &&
        !loading &&
        !data.blogConnection.pageInfo.hasPreviousPage &&
        (backpage = (
          <ArrowNone>
            <ArrowBackIcon style={{ fontSize: 27, color: '#cccccc' }} />
          </ArrowNone>
        ))
  }

  //error
  if (!data || !data.blogConnection) return <div>ERROR</div>
  if (loading) return <div>Loading</div>

  return (
    <ConnectionMain>
      <Search />
      <Whole>
        <Top>
          <NextButton
            className={asc}
            onClick={() => handleOnClick('ASC', 'active')}
          >
            ASC
          </NextButton>
          <NextButton
            className={desc}
            onClick={() => handleOnClick('DESC', 'none')}
          >
            DESC
          </NextButton>
          <Line></Line>
          <NextNumber
            className={number4}
            onClick={() => handleNumber(4, 'number')}
          >
            4
          </NextNumber>
          <NextNumber
            className={number8}
            onClick={() => handleNumber(8, 'number8')}
          >
            8
          </NextNumber>
          <NextNumber
            className={number12}
            onClick={() => handleNumber(12, 'number12')}
          >
            12
          </NextNumber>
          {/* <PageIndex /> */}
          <Page>
            <PageNumber>
              （{page}P . {data.blogConnection.totalPage}P）
            </PageNumber>
          </Page>
          <PageArrow>
            {backpage}
            {nextpage}
          </PageArrow>
        </Top>
        <Container>
          {data && !loading
            ? data.blogConnection.edges.map((blog) =>
                blog ? (
                  <Link
                    key={blog.node.id}
                    href="/blog/[id]"
                    as={`/blog/${blog.node.id}`}
                  >
                    <Main key={blog.node.id}>
                      <GettBlogImage id={blog.node.id} />
                      <Primary>
                        <Title>{blog.node.title}</Title>
                        <Text>{blog.node.text}</Text>
                      </Primary>
                      <span className="name">Created by : </span>
                      <CommentUserName id={blog.node.user.id} />
                      <Count>
                        <FavoriteBorderIcon style={{ fontSize: 18 }} />
                        <p className="like">{blog.node.likeCount}</p>
                      </Count>
                    </Main>
                  </Link>
                ) : null
              )
            : null}
        </Container>
      </Whole>
    </ConnectionMain>
  )
}

export default PagiNation
