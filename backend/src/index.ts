import app from "./server";

app.listen(3000,()=>{
    console.log('server is running on port 3000');
}).on('error',console.error);