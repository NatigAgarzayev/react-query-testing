import { useState } from 'react'
import './App.css'
import { useAddProduct, useDeleteProduct, useGetById, useGetData } from './api/queries'

type TProduct = {
  name: string,
  id?: number
}

function App() {

  const [name, setName] = useState("")
  const [id, setId] = useState(1)

  const { data: products, isLoading: isFetchingLoading } = useGetData()
  const { mutate: productMutation, isPending } = useAddProduct()
  const { data: product, isLoading: isLoadingById, refetch, isError: isGetByIdError } = useGetById(+id)
  const { mutate: deleteMutation } = useDeleteProduct()

  if (isFetchingLoading) {
    return <p>Loading...</p>
  }

  const addNewProduct = () => {
    productMutation(name)
  }

  const getProductById = () => {
    refetch()
  }

  const handleDelete = (id: number) => {
    deleteMutation(id)
  }

  return (
    <div>
      <div>
        <h2>Add data</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name" />
        <button disabled={isPending} onClick={addNewProduct}>{isPending ? "Pending" : "Add"}</button>
      </div>
      <div>
        <h2>Get data by Id</h2>
        <input
          value={id}
          onChange={(e) => setId(+e.target.value)}
          type="number"
          placeholder="name" />
        <button disabled={isLoadingById} onClick={getProductById}>{isLoadingById ? "Pending" : "Call"}</button>
        <p>Result: {product?.id} - {product?.name}</p>
        {isGetByIdError && <p>Got error..</p>}
      </div>
      <h1>Recieved Data</h1>
      <ol>
        {
          products?.map((item: TProduct) => (
            <li className="list-item" onClick={() => handleDelete(item.id || 0)} key={item.id}>{item.name}</li>
          ))
        }
      </ol>
    </div>
  )
}

export default App
