import {
  Box,
  Button,
  Fade,
  Flex,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { SourceEndpoint } from '../../components/shared/Graph/Endpoints'
import { TrashIcon, PlusIcon } from 'assets/icons'
import cuid from 'cuid'
import React, { useState } from 'react'

type ItemWithId<T> = T & { id: string }

export type TableListItemProps<T> = {
  item: T
  debounceTimeout?: number
  onItemChange: (item: T) => void
  onRemoveItem: () => void
}

type Props<T> = {
  initialItems: ItemWithId<T>[]
  addLabel?: string
  debounceTimeout?: number
  onItemsChange?: (items: ItemWithId<T>[]) => void
  Item: (props: TableListItemProps<T>) => JSX.Element
  ComponentBetweenItems?: (props: unknown) => JSX.Element
}

export const TableListOcta = <T,>({
  initialItems,
  onItemsChange,
  addLabel = 'Add',
  debounceTimeout,
  Item,
  ComponentBetweenItems = () => <></>,
}: Props<T>) => {
  const [items, setItems] = useState(initialItems)
  const [showDeleteIndex, setShowDeleteIndex] = useState<number | null>(null)

  const createItem = () => {
    const id = cuid()
    const newItem = { id } as ItemWithId<T>
    setItems([...items, newItem])
    if (onItemsChange) onItemsChange([...items, newItem])
  }

  const updateItem = (itemIndex: number, updates: Partial<T>) => {
    const newItems = items.map((item, idx) =>
      idx === itemIndex ? { ...item, ...updates } : item
    )
    setItems(newItems)
    if (onItemsChange) onItemsChange(newItems)
  }

  const deleteItem = (itemIndex: number) => () => {
    const newItems = [...items]
    newItems.splice(itemIndex, 1)
    setItems([...newItems])
    if (onItemsChange) onItemsChange([...newItems])
  }

  const handleMouseEnter = (itemIndex: number) => () =>
    setShowDeleteIndex(itemIndex)

  const handleCellChange = (itemIndex: number) => (item: T) =>
    updateItem(itemIndex, item)

  const handleMouseLeave = () => setShowDeleteIndex(null)

  return (
    <Stack spacing="4">
      {items.map((item, itemIndex) => (
        <Box key={item.id}>
          {itemIndex !== 0 && <ComponentBetweenItems />}
          <Flex
            pos="relative"
            onMouseEnter={handleMouseEnter(itemIndex)}
            onMouseLeave={handleMouseLeave}
            // mt={itemIndex !== 0 && ComponentBetweenItems() ? 4 : 0}
          >
            <Item
              item={item}
              onItemChange={handleCellChange(itemIndex)}
              debounceTimeout={debounceTimeout}
            />
            {/* <Fade in={showDeleteIndex === itemIndex}>
              <IconButton
                icon={<TrashIcon />}
                aria-label="Remove cell"
                onClick={deleteItem(itemIndex)}
                size="sm"
                shadow="md"
              />
            </Fade> */}
          </Flex>
        </Box>
      ))}
    </Stack>
  )
}
