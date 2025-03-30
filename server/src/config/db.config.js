import { connect } from "mongoose";

const connectMongoDB = async () => {
  try {
    const databaseInstance = await connect(
      `${process.env.DATABASE_URI}${process.env.DATABASE_NAME}`
    );

    console.log("Mongodb Connected:\nHost:", databaseInstance.connection.host);
    return databaseInstance;
  } catch (error) {
    console.error("Mongodb Error:", error);
    process.exit(1);
  }
};

export default connectMongoDB;
