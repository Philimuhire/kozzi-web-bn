import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import Product from './models/Product';
import Category from './models/Category';
import CartItem from './models/CartItem';
import Cart from './models/Cart';
import User from './models/User';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import contactRoutes from './routes/contactRoutes';
import userRoutes from './routes/userRoutes';
import reviewRoutes from './routes/reviewRoutes';
import cartRoutes from './routes/cartRoutes';
import cartItemRoutes from './routes/cartItemRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', 
}));

app.get('/', (req, res) => {
    res.send('Welcome to Kozzi Homes API');
});

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/contact', contactRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);
app.use('/carts', cartRoutes);
app.use('/cart-items', cartItemRoutes);

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

User .hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
        return sequelize.sync(); 
    })
    .then(() => {
        console.log('Database & tables created!');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });