import React from 'react'

export const BudgetContext = React.createContext()
export const PayeeContext = React.createContext()
export const PaymentContext = React.createContext()

export const ObjectProvider = ({ children, Context }) => {
  const [items, setItems] = React.useState({
    count: 0,
    nextPage: null,
    results: [],
    addedItems: 0,
  })

  const addItem = (newItem) => {
    setItems({
      ...items,
      count: items.count + 1,
      results: items.results.concat(newItem),
      addedItems: items.addedItems + 1,
    })
  }

  const resetItems = (newItems) => {
    setItems({
      count: newItems.count,
      nextPage: newItems.next,
      results: newItems.results,
      addedItems: 0,
    })
  }

  const updateItems = (newItems) => {
    setItems({
      count: newItems.count,
      nextPage: newItems.next,
      results: items.results
        .slice(0, items.results.length - items.addedItems)
        .concat(newItems.results),
      addedItems: 0,
    })
  }

  return (
    <Context.Provider
      value={{ items, setItems, addItem, resetItems, updateItems }}
    >
      {children}
    </Context.Provider>
  )
}
