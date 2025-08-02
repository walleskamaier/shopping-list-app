import { useEffect, useState } from "react"
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native"
import { styles } from "./styles"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Filter } from "@/components/Filter"
import { Item } from "@/components/Item"

import { FilterStatus } from "@/types/FilterStatus"
import { itemsStorage, ItemsStorage } from "@/storage/itemsStorage"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  const [filter, setFilter] = useState<FilterStatus>()
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemsStorage[]>([])

  function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert("Adicionar item", "Por favor, insira uma descrição.")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }
  }

  async function getItems() {
    try {
      const response = await itemsStorage.get()
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível filtrar os itens.")
    }
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/shoplist.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={handleAddItem} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={filter === status}
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item
                data={item}
                onStatusChange={() => console.log("Status muda")}
                onRemove={() => console.log("Remover")}
              />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => (
              <Text style={styles.empty}>Nenhum item aqui.</Text>
            )}
          />
        </View>
      </View>
    </View>
  )
}
