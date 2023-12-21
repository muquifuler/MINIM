const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3001; 
const cors = require('cors');

const allowedOrigins = [
    "http://localhost:5175"
];
  
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    const ipAddress = req.ip;
    next();
});

const uri = "mongodb+srv://muquifuler:i8KQNj03vB7Usb6E@minim.tvdsdoh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
}


async function breakRun() {
    await client.close();
}

// Generales

app.get('/products', async (req, res) => {
  try {
    await run();
    const database = client.db("MINIMDB"); 
    const collection = database.collection("Products");
    const products = await collection.find({}).toArray();
    res.json(products);
    await breakRun();
  } catch (err) {
    console.error("Error al realizar la consulta:", err);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

app.get('/orders', async (req, res) => {
    try {
      await run();
      const database = client.db("MINIMDB"); 
      const collection = database.collection("Orders");
      const orders = await collection.find({}).toArray();
      res.json(orders);
      await breakRun();
    } catch (err) {
      console.error("Error al realizar la consulta:", err);
      res.status(500).json({ error: "Error al obtener los pedidos" });
    }
});

app.get('/consultations', async (req, res) => {
  try {
    await run();
    const database = client.db("MINIMDB"); 
    const collection = database.collection("Consultations");
    const consultations = await collection.find({}).toArray();
    res.json(consultations);
    await breakRun();
  } catch (err) {
    console.error("Error al realizar la consulta:", err);
    res.status(500).json({ error: "Error al obtener las consultas" });
  }
});

app.get('/users', async (req, res) => {
    try {
      await run();
      const database = client.db("MINIMDB"); 
      const collection = database.collection("Users");
      const users = await collection.find({}).toArray();
      res.json(users);
      await breakRun();
    } catch (err) {
      console.error("Error al realizar la consulta:", err);
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

// Especificas

app.get('/users/:address', async (req, res) => {
    const userAddress = req.params.address;
  
    try {
        await run();
        const database = client.db("MINIMDB");
        const collection = database.collection("Users");
        const user = await collection.findOne({ address: userAddress.toLowerCase() });
    
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
        await breakRun();
    } catch (err) {
      console.error("Error al buscar el usuario:", err);
      res.status(500).json({ error: "Error al buscar el usuario" });
    }
});

app.post('/users/:address', async (req, res) => {
    try {
        await run();
        const database = client.db("MINIMDB");
        const collection = database.collection('Users');
        const address = req.params.address;


        const result = await collection.updateOne(
            { address: address },
            { $set: req.body },
            { upsert: true }  
        );
    
        if (result.upsertedCount === 1) {
            console.log(`Nuevo registro insertado para la dirección ${address}`);
        } else if (result.modifiedCount === 1) {
            console.log(`Registro actualizado con éxito para la dirección ${address}`);
        }

        res.status(200).json({ message: 'Registro actualizado con éxito' });
        await breakRun();
    } catch (error) {
        console.error('Error al actualizar o insertar el registro:', error);
        res.status(500).json({ error: 'Error al actualizar o insertar el registro' });
    }
        
});

app.post('/orders/:address', async (req, res) => {
  try {
      await run();
      const database = client.db("MINIMDB");
      const collection = database.collection('Users');
      const userAddress = req.params.address;
      
      console.log(req.body);

      const result = await collection.updateOne(
          { userAddress: userAddress },
          { $set: req.body },
          { upsert: true }  
      );
  
      if (result.upsertedCount === 1) {
          console.log(`Nuevo registro insertado para la dirección ${_id}`);
      } else if (result.modifiedCount === 1) {
          console.log(`Registro actualizado con éxito para la dirección ${_id}`);
      }

      res.status(200).json({ message: 'Registro actualizado con éxito' });
      await breakRun();
  } catch (error) {
      console.error('Error al actualizar o insertar el registro:', error);
      res.status(500).json({ error: 'Error al actualizar o insertar el registro' });
  }
      
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

