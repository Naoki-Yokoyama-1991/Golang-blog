import React, { useEffect } from 'react'
import { withAuthSync } from '../../../utils/auth'
import { UserBlogs } from '../../components/user/Blogs'
import { UserDelete } from '../../components/user/Delete'
import { UserUpdate } from '../../components/user/Upload'
import { useGetProfileQuery } from '../../generated/types.d'
import { Containerbottom, Grid } from '../../styles/pages/dashboard/User'
import Nav from '../../components/nav/Navigation'
import Link from 'next/Link'

interface Props {}

const UserProfile: React.FC<Props> = () => {
  const { data, loading, refetch } = useGetProfileQuery()

  useEffect(() => {
    if (!loading && data && refetch) {
      refetch()
    }
  }, [data])

  return (
    <>
      <Nav />
      <Containerbottom>
        <Grid>
          {loading ? (
            <p>loading blogs...</p>
          ) : (
            data &&
            !loading &&
            data.userProfile.blogs.map((blog: any) => (
              <Link key={blog.id} href="/blog/[id]" as={`/blog/${blog.id}`}>
                <div key={blog.id}>
                  <UserBlogs
                    blogs={blog}
                    id={blog.id}
                    userId={data.userProfile.id}
                    refetch={refetch}
                  />
                </div>
              </Link>
            ))
          )}
        </Grid>
        {/* <p>--------------------------------------------</p>
      <UserUpdate refetch={refetch} />
      <p>--------------------------------------------</p>
      <UserDelete /> */}
      </Containerbottom>
    </>
  )
}

export default withAuthSync(UserProfile)
