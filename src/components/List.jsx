import React from 'react'
import { Button, Container, List as MuiList, Typography } from '@mui/material'

export default function List({ initialList, onNextPage, ItemComponent }) {
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
          <ItemComponent item={item} key={item.id} />
        ))}
      </MuiList>
      {nextPage ? <Button onClick={onNextPageClick}>Load more</Button> : null}
    </Container>
  )
}
