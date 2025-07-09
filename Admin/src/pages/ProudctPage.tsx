import ProductCard from "@/components/ProductCard";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { addProduct, deleteProduct, getProduct } from "@/redux/product/product.slice";
import { useCallback, useEffect, useState } from "react"
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
import type {  productformType } from "@/types/types";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RxCrossCircled } from "react-icons/rx";
import Loading from "@/components/Loading";
import { getCompany } from "@/redux/company/company.slice";
import { getCategory } from "@/redux/category/category.slice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PaginationComponent } from "@/components/PaginationComponent";
function ProudctPage() {
  const dispatch = useAppDispatch();
  const { Product,count } = useAppSelector(state => state.product);
  const [formData, setFormData] = useState<productformType>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    isFeatured: true,
    tags: [],
    categoryId: 0,
    companyId: 0,
    images: [],
  });
  const [preview,setPreview] = useState<string[]>([]);
  useEffect(() => {
    dispatch(getProduct({page:0,limit:10}));
  }, [])

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(count / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(getProduct({page:page-1,limit:itemsPerPage}));
    // Add any additional logic here to fetch new data if needed
    console.log(`Navigating to page ${page}`);
  };
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleAddTagChange = useCallback((tag: string) => {
    if(tag.length < 1) {
      toast('Please add a tag');
      return
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: [...prevFormData.tags, tag],
    }));
  }, []);

  const handleFormSubmit = () => {
    if (formData.name.length < 2) {
      toast('Name must be at least 2 characters long');
      return
    }
    console.log(formData)
    dispatch(addProduct(formData));
    setFormData({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      isFeatured: true,
      tags: [],
      categoryId: 0,
      companyId: 0,
      images: [],
    })
  };

  const handleRemoveTag =(index:number)=>{
    const updatedTags = [...formData.tags];
    updatedTags.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: updatedTags,
    }));
  } 

  function handleRemoveImage(index: number) {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: updatedImages,
    }));
    setPreview((prevPreview) => prevPreview.filter((_, i) => i !== index));
  }

  function handleDelet(id:number){
    dispatch(deleteProduct(id));
  }

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, file],
      }));
      setPreview((prevPreview) => [...prevPreview, URL.createObjectURL(file)]);
    }
  },[]);
  return (
    <div className="text-white flex flex-wrap overflow-y-hidden">
      <div className="mt-10 w-full flex flex-col gap-10">
          <div className="flex flex-wrap gap-10 min-h-fit">
          {
            Product.map((item) => (
              <ProductCard key={item.id} item={item} onDelete={handleDelet} />
            ))
          }
          </div>
          <div className="flex gap-5 justify-center items-center">
          <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
      </div>
      <DrawerCompo inputChange={handleInputChange} preview={preview} handleRemoveImage={handleRemoveImage} handleImageChange={handleImageChange} handleRemoveTag={handleRemoveTag} handleTagChange={handleAddTagChange} value={formData} handleFormSubmit={handleFormSubmit} />
    </div>
  )
}

export default ProudctPage

interface DrawerCompoProps {
  inputChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
  value: productformType
  handleFormSubmit: () => void
  handleTagChange: (tag:string) => void
  handleRemoveTag: (index:number) => void
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  preview: string[]
  handleRemoveImage: (index: number) => void
}
function DrawerCompo({ inputChange, value, handleFormSubmit, handleTagChange, handleRemoveTag, handleImageChange, preview,handleRemoveImage }: DrawerCompoProps) {
  const [tag,setTag] = useState<string>("");
  const dispatch = useAppDispatch();
  const {Company} = useAppSelector(state => state.company);
  const {Category} = useAppSelector(state => state.category);
  const companyLoading = useAppSelector(state => state.company.loading);
  const categoryLoading = useAppSelector(state => state.category.loading);
  useEffect(() => {
    dispatch(getCompany());
    dispatch(getCategory());
  },[])
  if (companyLoading || categoryLoading) {
    return <Dialog>
      <Loading/>
    </Dialog>;
  }
  return (
    <Dialog >
      <form>
        <DialogTrigger asChild>
          <Button className="fixed bottom-4 right-4 shadow-md font-bold bg-gradient-to-tr from-blue-500 to-indigo-500">
            <IoIosAddCircleOutline />
            Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-foreground text-white shadow-md shadow-red-600">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Add a new product to your catalog
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input onChange={inputChange} id="name-1" name="name" defaultValue={value.name} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Description</Label>
              <Textarea onChange={inputChange} id="description" name="description" defaultValue={value.description} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Price</Label>
              <Input onChange={inputChange} id="price" name="price" defaultValue={value.price} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Stock</Label>
              <Input type="number" onChange={inputChange} id="description" name="stock" defaultValue={value.stock} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Company</Label>
              <Select
                onValueChange={(value) =>
                  inputChange({
                    target: {
                      name: "companyId",
                      value: value,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {
                    Company.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Company</Label>
              <Select
                onValueChange={(value) =>
                  inputChange({
                    target: {
                      name: "categoryId",
                      value: value,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {
                    Category.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            {/* below is images and tags */}
            <div className="grid gap-3">
              <Label htmlFor="name-1">Tags</Label>
              <div className="flex flex-col gap-2 relative">
                <Input value={tag} onChange={(e)=>setTag(e.target.value)} id="tags" name="tags"  />
                <Button className="absolute top-0.5 right-0.5  h-[32px]" variant={"secondary"} onClick={() => {
                  handleTagChange(tag)
                  setTag("")
                }}>Add Tag</Button>
                <div className="flex gap-2 flex-wrap">
                  {
                    value.tags.map((tag,index) => <div key={index} className="relative w-[88px] h-[32px] flex items-center justify-center cursor-pointer ">
                      <span onClick={() => handleRemoveTag(index)} className="absolute top-0 right-0 cursor-pointer bg-white rounded-full w-4 h-4 flex items-center justify-center text-gray-800">
                        <RxCrossCircled />
                        </span>
                      <Badge variant={"outline"} className="text-white" key={tag}>{tag}</Badge>
                    </div>)
                  }
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">images</Label>
              {!preview[0] && <Input type="file"  onChange={handleImageChange} id="images" name="images" />}
              {!preview[1] && <Input type="file"  onChange={handleImageChange} id="images" name="images" />}
              {!preview[2] && <Input type="file"  onChange={handleImageChange} id="images" name="images" />}
              {!preview[3] && <Input type="file"  onChange={handleImageChange} id="images" name="images" />}
              {!preview[4] && <Input type="file"  onChange={handleImageChange} id="images" name="images" />}
              <div className="flex gap-3 flex-wrap">
                {preview.map((image,index) => <div key={index} className="relative w-[88px] h-[88px] flex items-center justify-center cursor-pointer">
                  <span onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 cursor-pointer bg-white rounded-full w-4 h-4 flex items-center justify-center text-gray-800">
                    <RxCrossCircled />
                    </span>
                  <img className="w-full h-full object-cover" src={image} alt="" />
                </div>)}
              </div>
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
