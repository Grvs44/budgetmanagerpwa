import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { getAll } from '../../data/group'

export default function BudgetList() {
  const { list } = useLoaderData()
  return (
    <div>
      <Link to="create">
        <button>Create budget</button>
      </Link>
      {list.length ? (
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              <Link to={`${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No budgets</p>
      )}
    </div>
  )
}

export async function loader({ params }) {
  console.log('budget loader')
  const list = await getAll()
  return { list }
}
