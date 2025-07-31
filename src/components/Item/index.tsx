import { styles } from "./styles"
import { Text, View, TouchableOpacity } from "react-native"
import { Trash2 } from "lucide-react-native"
import { StatusIcon } from "@/components/StatusIcon"
import { FilterStatus } from "@/types/FilterStatus"

type ItemData = {
  status: FilterStatus
  description: string
}

type Props = {
  data: ItemData
  onStatusChange: () => void
  onRemove: () => void
}

export function Item({ data, onRemove, onStatusChange }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatusChange}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  )
}
