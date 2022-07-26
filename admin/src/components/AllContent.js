import { Box, Button, CardMedia, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { GetAllContent } from "../utils/API_CALLS"

const AllContent = () => {

    const [content, setContent] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await GetAllContent();
            setContent(data)
        }
        fetchData()
    }, [])

    return (
        <Box>
            <TableContainer sx={{ maxHeight: '80vh', overflowY: 'scroll', }}>
                <Table stickyHeader>
                    <TableHead sx={{ background: "#" }}>
                        <TableRow sx={{ textTransform: 'uppercase' }}>
                            <TableCell>Thumbnail</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            content?.map((doc) => {
                                return (
                                    doc.postList.map((post) => {
                                        return (
                                            <TableRow key={post._id} hover>
                                                <TableCell sx={{ cursor: 'pointer' }}>
                                                    <Link href={post.instaUrl} target="_blank" underline="none">
                                                        <CardMedia
                                                            component="img"
                                                            sx={{ width: 90 }}
                                                            image={post.imgUrl}
                                                            alt="Live from space album cover"
                                                        />
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{post.title}</TableCell>
                                                <TableCell>{doc.category}</TableCell>
                                                <TableCell>
                                                    <Link href={post.instaUrl} target="_blank" underline="none">View</Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default AllContent