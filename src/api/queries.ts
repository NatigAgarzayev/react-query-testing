import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

//get all
export const useGetData = () => {
    return useQuery(
        {
            queryKey: ['product'],
            queryFn: async () => {
                const res = await axios.get("https://65193f89818c4e98ac603117.mockapi.io/products")
                    .then(res => res.data)
                return res
            }
        })
}


//add new
export const useAddProduct = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: async (data: string) => {
                await axios.post("https://65193f89818c4e98ac603117.mockapi.io/products", {
                    name: data
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries(
                    {
                        queryKey: ['product']
                    }
                )
            }
        }
    )
}

//get by id
export const useGetById = (id: number) => {
    return useQuery(
        {
            queryKey: ['product', id],
            queryFn: async () => {
                const res = await axios.get(`https://65193f89818c4e98ac603117.mockapi.io/products/${id}`)
                    .then(res => res.data)
                console.log(res)
                return res
            },
            enabled: true,
        }
    )
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: async (id: number) => {
                await axios.delete(`https://65193f89818c4e98ac603117.mockapi.io/products/${id}`)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(
                    {
                        queryKey: ['product']
                    }
                )
            }
        }
    )
}