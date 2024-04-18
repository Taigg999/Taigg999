import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://taigg27052003:123@cluster0.2kldgnx.mongodb.net/clone_shopee?retryWrites=true&w=majority&appName=Cluster0',
        );

        console.log('Thanh cong');
    } catch (error) {
        console.log('F');
    }
};

export default connectDB;
