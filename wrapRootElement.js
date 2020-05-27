import React from "react"
import { ShopProvider } from "./src/context/ShopContext"

export const wrapRootElement = ({ element }) => {
  return <ShopProvider>{element}</ShopProvider>
}
