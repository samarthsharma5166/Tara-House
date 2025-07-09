import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { addCategory, deleteCategory, editCategory, getCategory } from "@/redux/category/category.slice";
import type { categoryformType } from "@/types/types";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "sonner";
import Loading from "@/components/Loading"
import { format } from "date-fns";
import Nav from "@/components/Nav"
import Sidebar from "@/components/Sidebar"

function CategoryPage() {
    const [formData, setFormData] = useState<categoryformType>({ name: "", });
    const { loading, Category } = useAppSelector((state) => state.category);
    const [edit, setEdit] = useState(-1);
    const {isOpen} = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch();
    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }, []);


    const handleFormSubmit = () => {
        if (formData.name.length < 2) {
            toast('Name must be at least 2 characters long');
            return
        }
        dispatch(addCategory(formData));
    };
  
    useEffect(() => {
        dispatch(getCategory());
    }, [])  
    function handleEdit() {
        const data = {
            id: edit,
            name: formData.name
        }
        setEdit(-1);
        dispatch(editCategory(data))
    }

    if (!Category) {
        return <div className="animate-pulse w-full h-full font-bold text-2xl container text-center text-white mx-auto bg-foreground">
            wait...
        </div>
    }
    return (
        <div className="text-white w-full h-full container mx-auto bg-foreground">
            <Nav />
            {isOpen && <Sidebar />}
            {
                loading ? <Loading /> : (
                    <Table>
                        <TableCaption>A list of your Category.</TableCaption>
                        <TableHeader>
                            <TableRow >
                                <TableHead className="text-center w-[100px] text-white font-bold">ID</TableHead>
                                <TableHead className="text-center text-white font-bold">Name</TableHead>
                                <TableHead className="text-center text-white font-bold">Created At</TableHead>
                                <TableHead className="text-center text-white font-bold">Updated At</TableHead>
                                <TableHead className="text-center text-white font-bold">Manage</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                Category.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="text-center font-medium">{category.id}</TableCell>
                                        {edit === category.id ? (
                                            <TableCell className="text-center">
                                                <Input className="text-center" onChange={handleInputChange} name="name" defaultValue={category.name} />
                                            </TableCell>)
                                            : (
                                                <TableCell className="text-center">
                                                    {category.name}
                                                </TableCell>)
                                        }
                                        <TableCell className="text-center">{format(category.createdAt, 'dd-MM-yyyy')}</TableCell>
                                        <TableCell className="text-center">{format(category.updatedAt, 'dd-MM-yyyy')}</TableCell>
                                        {edit === category.id ? (
                                            <TableCell className="space-x-2 text-center">
                                                <Button variant={"secondary"} onClick={handleEdit}>Save</Button>
                                            </TableCell>
                                        ) : (<TableCell className="space-x-2 text-center">
                                            <Button onClick={() => setEdit(category.id)} size={"sm"} variant={"secondary"}>Edit</Button>
                                            <Button onClick={() => dispatch(deleteCategory(category.id))} size={"sm"} variant={"destructive"} >Delete</Button>
                                        </TableCell>)
                                        }
                                        {/* <TableCell className="text-right">{category.amount}</TableCell> */}
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                )
            }


            {/* Drawer componet */}
            <DrawerCompo inputChange={handleInputChange} value={formData} handleFormSubmit={handleFormSubmit} />
        </div>
    )
}

export default CategoryPage


interface DrawerCompoProps {
    inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: categoryformType
    handleFormSubmit: () => void
}
function DrawerCompo({ inputChange, value, handleFormSubmit }: DrawerCompoProps) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="fixed bottom-4 right-4 shadow-md font-bold bg-gradient-to-tr from-blue-500 to-indigo-500">
                        <IoIosAddCircleOutline />
                        Category
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-foreground text-white shadow-md shadow-red-600">
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>
                            Add a new category to your catalog
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input onChange={inputChange} id="name-1" name="name" defaultValue={value.name} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"secondary"}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleFormSubmit}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}