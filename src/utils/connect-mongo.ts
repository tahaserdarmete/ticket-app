import mongoose, {mongo} from "mongoose";

// env'deki veri tabanına url'i
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

// mevcut bağlantıyı tutacak nesne
const cached: {
  connection?: typeof mongoose;
  promise?: Promise<typeof mongoose>;
} = {};

// veritabanına bağlanacak ve bağlantıyı cache'e atacak
// fonksiyon tekrar çağırıldığında zaten cache'de bir bağlantı varsa bir daha bağlantı kurmak yerine onu kullanacak
async function connectMongo(): Promise<typeof mongoose> {
  // bağlantı url i yoksa hata gönder
  if (!MONGO_URI) {
    throw new Error("Lütfen MONGO_URI değişkenini tanımlayın");
  }

  // eğer mevcut bir bağlantı varsa
  if (cached.connection) {
    // mevcut bağlantıyı döndür ve yeni bağlantı kurma
    return cached.connection;
  }

  // mevcut bağlantı yoksa
  if (!cached.promise) {
    // yeni bir veritabanı bağlantısı oluştur
    cached.promise = mongoose.connect(MONGO_URI, {bufferCommands: false});
  }

  // mevcut veritabanı promise'e bağlanmaya çalış
  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = undefined;
    throw error;
  }

  // mevcut bağlantıyı return et
  return cached.connection;
}

export default connectMongo;
