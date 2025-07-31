import { View, Image, TouchableOpacity, Text, FlatList } from "react-native"
import { styles } from "./styles"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Filter } from "@/components/Filter"
import { Item } from "@/components/Item"

import { FilterStatus } from "@/types/FilterStatus"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
  {
    id: "1",
    status: FilterStatus.DONE,
    description: "Leite",
  },
  {
    id: "2",
    status: FilterStatus.PENDING,
    description: "Arroz",
  },
  {
    id: "3",
    status: FilterStatus.PENDING,
    description: "Feijão",
  },
]

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/shoplist.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={ITEMS}
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
