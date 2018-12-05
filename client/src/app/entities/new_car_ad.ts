export  class NewCarAdModel{
public car_model_year:string;
public car_model_id:string;
public car_price:string;
public km_driven:string;
public car_engine_capacity:string;
public car_description:string;
public car_engine_type:string;
public car_transmission_type:string;
public car_registration_type:string;
public contact_number:string
public car_image:File;
public constructor(values:Object=[]){
    Object.assign(this,values);
}





}