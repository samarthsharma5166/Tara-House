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
import type { companyformType } from "@/types/types";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "sonner";
import Loading from "@/components/Loading"
import { useAppDispatch, useAppSelector } from "@/hooks/hook"
import { format } from "date-fns"
import { addCompany, deleteCompany, editCompany, getCompany } from "@/redux/company/company.slice"
import Nav from "@/components/Nav"
import Sidebar from "@/components/Sidebar"

function CompanyPage() {
    const dispatch = useAppDispatch();
    const { loading, Company } = useAppSelector(state => state.company)
    const {isOpen} = useAppSelector(state => state.modal)
    const [formData, setFormData] = useState<companyformType>({ name: "", })
    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }, []);

    const [edit, setEdit] = useState(-1);

    useEffect(() => {
        dispatch(getCompany());
    }, []);

    function handleEdit() {
        const data = {
            id: edit,
            name: formData.name
        }
        setEdit(-1);
        dispatch(editCompany(data))
    }

    const handleFormSubmit = () => {
        if (formData.name.length < 2) {
            toast('Name must be at least 2 characters long');
            return
        }
        dispatch(addCompany(formData))
    };
    if(!Company){
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
                                Company && Company.length > 0 && Company.map((category) => (
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
                                                <Button onClick={() => dispatch(deleteCompany(category.id))} size={"sm"} variant={"destructive"} >Delete</Button>
                                        </TableCell>)
                                        }
                                        {/* <TableCell className="text-right">{category.amount}</TableCell> */}
                                    </TableRow>
                                ))
                            }
                            {
                                Company.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )
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

export default CompanyPage

interface DrawerCompoProps {
    inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: companyformType
    handleFormSubmit: () => void
}
function DrawerCompo({ inputChange, value, handleFormSubmit }: DrawerCompoProps) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="fixed bottom-4 right-4 shadow-md font-bold bg-gradient-to-tr from-blue-500 to-indigo-500">
                        <IoIosAddCircleOutline />
                        Company
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-foreground text-white shadow-md shadow-red-600">
                    <DialogHeader>
                        <DialogTitle>Add New Company</DialogTitle>
                        <DialogDescription>
                            Add a new company to your catalog
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