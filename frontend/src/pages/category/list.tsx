import React from 'react'
import { withAuthSync } from '../../../utils/auth'
import { CategoryCreate } from '../../components/category/Create'
import { CategoryDelete } from '../../components/category/Delete'
import {
  useGetCategoriesQuery,
  useGetProfileQuery
} from '../../generated/types.d'

const ListCategory: React.FC = () => {
  // Query categories[token]
  const categoriesQuery = useGetCategoriesQuery()

  // Query user[token]
  const { data: userData, loading: userLoading } = useGetProfileQuery()

  return (
    <div>
      <CategoryCreate refetch={categoriesQuery.refetch} />
      <p>---------------------------------------</p>
      <div>
        {categoriesQuery.loading ? (
          <p>loading categories...</p>
        ) : (
          categoriesQuery.data &&
          categoriesQuery.data.categories.map((category: any) => (
            <div key={category.id}>
              <p>{category.name}</p>
              {!userLoading && category.user.id === userData.userProfile.id ? (
                <CategoryDelete
                  id={category.id}
                  refetch={categoriesQuery.refetch}
                />
              ) : (
                <p>You can delete it if you are the Owner.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default withAuthSync(ListCategory)
