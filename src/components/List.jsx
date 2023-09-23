import React from 'react'
import { Button, Container, List as MuiList, ListItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function List({ initialList, onNextPage }) {
  const [list, setList] = React.useState(initialList.results)
  const [nextPage, setNextPage] = React.useState(initialList.next)

  const onNextPageClick = async () => {
    const newList = await onNextPage(nextPage)
    setList(list.concat(newList.results))
    setNextPage(newList.next)
  }

  return (
    <Container>
      <Typography>
        Showing {list.length} of {initialList.count}
      </Typography>
      <MuiList>
        {list.map((item) => (
          <ListItem key={item.id}>
            <Link to={item.id.toString()}>{item.name}</Link>
          </ListItem>
        ))}
      </MuiList>
      {nextPage ? <Button onClick={onNextPageClick}>Load more</Button> : null}
    </Container>
  )
}
