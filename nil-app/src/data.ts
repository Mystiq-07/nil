import type { MenuItem, Restaurant } from './types'

// Placeholder menus with categories, descriptions, and bestseller flags.
// Prices only — never calorie or nutrition data (product rule).

const NORTH_INDIAN: MenuItem[] = [
  // Recommended
  { id: 'ni-rec-1', name: 'Butter Chicken', price: 340, emoji: '🍗', tone: '#7A3E22', category: 'Recommended', description: 'Tender chicken in a velvety tomato-butter sauce. Our most-ordered dish.', bestseller: true },
  { id: 'ni-rec-2', name: 'Dal Makhani', price: 220, emoji: '🫘', tone: '#5E3A22', category: 'Recommended', description: 'Slow-cooked black lentils in rich cream and butter. Simmered for 8 hours.', bestseller: true },
  { id: 'ni-rec-3', name: 'Chicken Biryani', price: 320, emoji: '🍛', tone: '#7A3E22', category: 'Recommended', description: 'Fragrant basmati layered with spiced chicken and fried onions. Served with raita.', bestseller: true },
  { id: 'ni-rec-4', name: 'Paneer Tikka', price: 260, emoji: '🧀', tone: '#5E4A1E', category: 'Recommended', description: 'Smoky charred cottage cheese with peppers in a yogurt marinade.' },
  { id: 'ni-rec-5', name: 'Garlic Naan', price: 80, emoji: '🫓', tone: '#6B5320', category: 'Recommended', description: 'Pillowy naan brushed with roasted garlic butter, straight from the tandoor.', bestseller: true },
  // Starters
  { id: 'ni-st-1', name: 'Chicken Tikka', price: 280, emoji: '🍢', tone: '#7A3E22', category: 'Starters', description: 'Marinated chicken thigh, chargrilled until smoky and tender.' },
  { id: 'ni-st-2', name: 'Seekh Kebab', price: 300, emoji: '🍡', tone: '#6B3A1E', category: 'Starters', description: 'Minced lamb and spice skewers, cooked over charcoal. Served with mint chutney.' },
  { id: 'ni-st-3', name: 'Aloo Tikki', price: 90, emoji: '🥔', tone: '#6B5320', category: 'Starters', description: 'Crispy potato patties with mint chutney and tamarind drizzle.' },
  { id: 'ni-st-4', name: 'Samosa (2 pcs)', price: 70, emoji: '🔺', tone: '#6B5320', category: 'Starters', description: 'Flaky pastry filled with spiced potato and green peas.' },
  { id: 'ni-st-5', name: 'Onion Bhajia', price: 120, emoji: '🧅', tone: '#6B5320', category: 'Starters', description: 'Crispy onion fritters with a coriander-green chilli dip.' },
  { id: 'ni-st-6', name: 'Fish Amritsari', price: 320, emoji: '🐟', tone: '#5E4A1E', category: 'Starters', description: 'Beer-battered fish fillet with ajwain and a squeeze of lime.' },
  { id: 'ni-st-7', name: 'Chicken 65', price: 260, emoji: '🌶️', tone: '#7A3E22', category: 'Starters', description: 'Double-fried chicken in a tangy, fiery sauce. A bar snack classic.' },
  { id: 'ni-st-8', name: 'Paneer Tikka Starter', price: 240, emoji: '🧀', tone: '#5E4A1E', category: 'Starters', description: 'Cottage cheese cubes with capsicum and onion in spiced yogurt marinade.' },
  // Curries
  { id: 'ni-cur-1', name: 'Butter Chicken', price: 340, emoji: '🍗', tone: '#7A3E22', category: 'Curries & Gravies', description: 'Velvety tomato-butter gravy, mild spice. The benchmark of this cuisine.', bestseller: true },
  { id: 'ni-cur-2', name: 'Dal Makhani', price: 220, emoji: '🫘', tone: '#5E3A22', category: 'Curries & Gravies', description: 'Overnight black lentils, finished with cream and butter.' },
  { id: 'ni-cur-3', name: 'Paneer Butter Masala', price: 280, emoji: '🧀', tone: '#7A3E22', category: 'Curries & Gravies', description: 'Silky tomato sauce with fresh paneer cubes. Can be spiced on request.' },
  { id: 'ni-cur-4', name: 'Mutton Rogan Josh', price: 420, emoji: '🍖', tone: '#6B3A1E', category: 'Curries & Gravies', description: 'Slow-braised lamb with whole spices and Kashmiri chilli. Earthy and rich.' },
  { id: 'ni-cur-5', name: 'Chicken Korma', price: 360, emoji: '🍗', tone: '#6B5320', category: 'Curries & Gravies', description: 'Coconut cream and cashew gravy, gently spiced. Aromatic rather than hot.' },
  { id: 'ni-cur-6', name: 'Palak Paneer', price: 250, emoji: '🥬', tone: '#3A6B3A', category: 'Curries & Gravies', description: 'Blanched spinach purée with soft cottage cheese cubes and a cumin temper.' },
  { id: 'ni-cur-7', name: 'Chole Masala', price: 200, emoji: '🫘', tone: '#5E4A1E', category: 'Curries & Gravies', description: 'Thick chickpea curry with ginger, pomegranate and whole spices.' },
  { id: 'ni-cur-8', name: 'Kadai Paneer', price: 270, emoji: '🧀', tone: '#7A3E22', category: 'Curries & Gravies', description: 'Paneer with capsicum in a dry, spiced tomato-onion gravy.' },
  { id: 'ni-cur-9', name: 'Chicken Tikka Masala', price: 360, emoji: '🍗', tone: '#7A3E22', category: 'Curries & Gravies', description: 'Chargrilled chicken in a smoky, tangy tomato masala. Richer than butter chicken.' },
  { id: 'ni-cur-10', name: 'Mutton Keema', price: 380, emoji: '🍖', tone: '#6B3A1E', category: 'Curries & Gravies', description: 'Minced lamb with onion, tomato and fresh garam masala. Pairs with naan.' },
  // Biryani
  { id: 'ni-bry-1', name: 'Chicken Biryani', price: 320, emoji: '🍛', tone: '#7A3E22', category: 'Biryani & Rice', description: 'Slow-cooked basmati with marinated chicken and fried onions. Serves 1.', bestseller: true },
  { id: 'ni-bry-2', name: 'Mutton Biryani', price: 420, emoji: '🍛', tone: '#6B3A1E', category: 'Biryani & Rice', description: 'Tender lamb pieces layered in fragrant saffron rice. Cooked dum style.' },
  { id: 'ni-bry-3', name: 'Veg Biryani', price: 240, emoji: '🍛', tone: '#3A6B3A', category: 'Biryani & Rice', description: 'Garden vegetables with saffron basmati, fresh mint and fried cashews.' },
  { id: 'ni-bry-4', name: 'Egg Biryani', price: 260, emoji: '🥚', tone: '#6B5320', category: 'Biryani & Rice', description: 'Spiced biryani with whole boiled eggs. A weekday favourite.' },
  { id: 'ni-bry-5', name: 'Hyderabadi Biryani', price: 360, emoji: '🍛', tone: '#7A3E22', category: 'Biryani & Rice', description: 'Dum-style rice sealed with dough for maximum flavour absorption.', veg: false },
  { id: 'ni-bry-6', name: 'Jeera Rice', price: 120, emoji: '🍚', tone: '#6B5320', category: 'Biryani & Rice', description: 'Fragrant cumin-tempered basmati. The right pairing for any gravy.' },
  // Breads
  { id: 'ni-br-1', name: 'Butter Naan', price: 60, emoji: '🫓', tone: '#6B5320', category: 'Breads', description: 'Leavened bread straight from the tandoor, brushed generously with butter.' },
  { id: 'ni-br-2', name: 'Garlic Naan', price: 80, emoji: '🫓', tone: '#6B5320', category: 'Breads', description: 'Roasted garlic and fresh coriander kneaded into the dough before baking.', bestseller: true },
  { id: 'ni-br-3', name: 'Paratha', price: 70, emoji: '🫓', tone: '#6B5320', category: 'Breads', description: 'Whole wheat, layered and pan-fried. Served with pickle and yogurt.' },
  { id: 'ni-br-4', name: 'Tandoori Roti', price: 40, emoji: '🫓', tone: '#6B5320', category: 'Breads', description: 'Thin, charred wholegrain bread. Light and rustic.' },
  { id: 'ni-br-5', name: 'Kulcha', price: 90, emoji: '🫓', tone: '#6B5320', category: 'Breads', description: 'Stuffed leavened bread — choose onion or spiced potato filling.' },
  // Desserts
  { id: 'ni-ds-1', name: 'Gulab Jamun (2 pcs)', price: 90, emoji: '🍮', tone: '#5E3A22', category: 'Desserts', description: 'Soft milk-solid dumplings soaked in rose and cardamom syrup.' },
  { id: 'ni-ds-2', name: 'Rasgulla', price: 80, emoji: '⚪', tone: '#4A3A2E', category: 'Desserts', description: 'Spongy cottage cheese balls in light sugar syrup. Light after a heavy meal.' },
  { id: 'ni-ds-3', name: 'Kheer', price: 120, emoji: '🥛', tone: '#5E4A1E', category: 'Desserts', description: 'Slow-cooked rice pudding with cardamom and crushed pistachios.' },
  { id: 'ni-ds-4', name: 'Kulfi', price: 100, emoji: '🍦', tone: '#4A3A2E', category: 'Desserts', description: 'Dense frozen dessert in malai, pistachio or rose. Comes on a stick.' },
  // Drinks
  { id: 'ni-dr-1', name: 'Sweet Lassi', price: 100, emoji: '🥛', tone: '#4A3A2E', category: 'Drinks', description: 'Chilled yogurt drink with sugar and a hint of cardamom.' },
  { id: 'ni-dr-2', name: 'Mango Lassi', price: 130, emoji: '🥭', tone: '#7A5A22', category: 'Drinks', description: 'Thick blended Alphonso mango with yogurt. Seasonal and sweet.' },
  { id: 'ni-dr-3', name: 'Masala Chaas', price: 80, emoji: '🥛', tone: '#4A3A2E', category: 'Drinks', description: 'Spiced buttermilk with cumin, coriander and a pinch of asafoetida.' },
  { id: 'ni-dr-4', name: 'Nimbu Pani', price: 70, emoji: '🍋', tone: '#6B6B1E', category: 'Drinks', description: 'Freshly squeezed lime with salt and sugar. The original rehydrator.' },
]

const SOUTH_INDIAN: MenuItem[] = [
  // Recommended
  { id: 'si-rec-1', name: 'Masala Dosa', price: 140, emoji: '🥞', tone: '#6B5320', category: 'Recommended', description: 'Crispy fermented rice crepe with a spiced potato filling and sambar.', bestseller: true },
  { id: 'si-rec-2', name: 'Idli Sambar (3 pcs)', price: 90, emoji: '🍚', tone: '#5E4A1E', category: 'Recommended', description: 'Steamed rice cakes in a tangy lentil-vegetable broth. Light and satisfying.', bestseller: true },
  { id: 'si-rec-3', name: 'Ghee Pongal', price: 130, emoji: '🍲', tone: '#6B5320', category: 'Recommended', description: 'Rice and moong dal porridge cooked in ghee with black pepper and cashews.' },
  { id: 'si-rec-4', name: 'Medu Vada (2 pcs)', price: 90, emoji: '🍩', tone: '#5E4A1E', category: 'Recommended', description: 'Crispy lentil fritters with a soft centre. Comes with coconut chutney.', bestseller: true },
  { id: 'si-rec-5', name: 'Filter Coffee', price: 70, emoji: '☕', tone: '#4A3A2E', category: 'Recommended', description: 'South Indian double decoction with frothed whole milk. The real thing.' },
  // Dosas
  { id: 'si-dosa-1', name: 'Plain Dosa', price: 90, emoji: '🥞', tone: '#6B5320', category: 'Dosas', description: 'Thin and crispy, no filling. Served with sambar and two chutneys.' },
  { id: 'si-dosa-2', name: 'Masala Dosa', price: 140, emoji: '🥞', tone: '#6B5320', category: 'Dosas', description: 'Classic with spiced potato filling. The gold standard.', bestseller: true },
  { id: 'si-dosa-3', name: 'Mysore Masala Dosa', price: 150, emoji: '🥞', tone: '#7A3E22', category: 'Dosas', description: 'Spiced red chutney layered on the inside before the potato filling.' },
  { id: 'si-dosa-4', name: 'Onion Rava Dosa', price: 130, emoji: '🥞', tone: '#6B5320', category: 'Dosas', description: 'Semolina crepe with caramelised onion. Light and lacy texture.' },
  { id: 'si-dosa-5', name: 'Set Dosa (3 pcs)', price: 110, emoji: '🥞', tone: '#6B5320', category: 'Dosas', description: 'Thick, soft, spongy dosas. Lighter and more filling than masala.' },
  { id: 'si-dosa-6', name: 'Paper Dosa', price: 160, emoji: '🥞', tone: '#6B5320', category: 'Dosas', description: 'Extra thin, extra crispy. Almost a metre long. Order for the experience.' },
  { id: 'si-dosa-7', name: 'Pesarattu', price: 130, emoji: '🥞', tone: '#3A6B3A', category: 'Dosas', description: 'Green moong dal crepe with ginger and cumin. High protein.' },
  // Idli & Vada
  { id: 'si-iv-1', name: 'Idli Sambar (3 pcs)', price: 90, emoji: '🍚', tone: '#5E4A1E', category: 'Idli & Vada', description: 'Steamed rice cakes in tangy lentil broth.', bestseller: true },
  { id: 'si-iv-2', name: 'Mini Idli (12 pcs)', price: 140, emoji: '🍚', tone: '#5E4A1E', category: 'Idli & Vada', description: 'Bite-size idlis dunked in sambar. Great for sharing.' },
  { id: 'si-iv-3', name: 'Medu Vada (2 pcs)', price: 90, emoji: '🍩', tone: '#5E4A1E', category: 'Idli & Vada', description: 'Crispy lentil rings with coconut chutney and sambar.' },
  { id: 'si-iv-4', name: 'Sambar Vada', price: 100, emoji: '🍩', tone: '#5E4A1E', category: 'Idli & Vada', description: 'Vada soaked in sambar until soft throughout. A comfort classic.' },
  { id: 'si-iv-5', name: 'Rava Idli', price: 110, emoji: '🍚', tone: '#5E4A1E', category: 'Idli & Vada', description: 'Semolina-based idli with cashews and curry leaves.' },
  // Rice & Meals
  { id: 'si-rice-1', name: 'Ghee Pongal', price: 130, emoji: '🍲', tone: '#6B5320', category: 'Rice & Meals', description: 'Rice and moong dal with black pepper, ghee and cashews.' },
  { id: 'si-rice-2', name: 'Curd Rice', price: 100, emoji: '🍚', tone: '#5E4A1E', category: 'Rice & Meals', description: 'Cooked rice with yogurt and a mustard-curry leaf temper. Cooling.' },
  { id: 'si-rice-3', name: 'Lemon Rice', price: 110, emoji: '🍚', tone: '#6B6B1E', category: 'Rice & Meals', description: 'Turmeric-tinted rice with lemon, peanuts and mustard seeds.' },
  { id: 'si-rice-4', name: 'Tomato Rice', price: 110, emoji: '🍚', tone: '#7A3E22', category: 'Rice & Meals', description: 'Tangy rice with fresh tomatoes and a South Indian spice base.' },
  { id: 'si-rice-5', name: 'Bisibelebath', price: 150, emoji: '🍲', tone: '#7A3E22', category: 'Rice & Meals', description: "Rice, lentils and vegetables cooked together with tamarind. Karnataka's comfort food."},
  { id: 'si-rice-6', name: 'Meals Thali', price: 180, emoji: '🍱', tone: '#5E4A1E', category: 'Rice & Meals', description: 'Rice, two curries, rasam, sambar, papad and dessert. The full spread.' },
  // Drinks
  { id: 'si-dr-1', name: 'Filter Coffee', price: 70, emoji: '☕', tone: '#4A3A2E', category: 'Drinks', description: 'Double decoction, frothy and strong. The South Indian way.', bestseller: true },
  { id: 'si-dr-2', name: 'Buttermilk', price: 60, emoji: '🥛', tone: '#4A3A2E', category: 'Drinks', description: 'Thin, spiced and cooling. The antidote to a spicy meal.' },
  { id: 'si-dr-3', name: 'Fresh Lime Soda', price: 80, emoji: '🍋', tone: '#6B6B1E', category: 'Drinks', description: 'Squeezed lime with soda — choose salt, sugar or both.' },
  { id: 'si-dr-4', name: 'Tender Coconut', price: 90, emoji: '🥥', tone: '#4A6B3A', category: 'Drinks', description: 'Fresh coconut water served chilled. Nothing added.' },
]

const ITALIAN: MenuItem[] = [
  // Recommended
  { id: 'it-rec-1', name: 'Margherita Pizza', price: 280, emoji: '🍕', tone: '#6E2F2C', category: 'Recommended', description: 'San Marzano tomato, buffalo mozzarella, fresh basil. Simple and perfect.', bestseller: true },
  { id: 'it-rec-2', name: 'Penne Arrabbiata', price: 260, emoji: '🍝', tone: '#6E2F2C', category: 'Recommended', description: 'Penne with spicy tomato, garlic and fresh red chilli. No frills, all flavour.', bestseller: true },
  { id: 'it-rec-3', name: 'Burrata Bruschetta', price: 220, emoji: '🍞', tone: '#6B5320', category: 'Recommended', description: 'Toasted sourdough with creamy burrata, cherry tomatoes and balsamic glaze.' },
  { id: 'it-rec-4', name: 'Tiramisu', price: 200, emoji: '🍰', tone: '#5E3A22', category: 'Recommended', description: 'Espresso-soaked ladyfingers in mascarpone cream. Dusted with cocoa.', bestseller: true },
  { id: 'it-rec-5', name: 'Garlic Bread', price: 150, emoji: '🥖', tone: '#6B5320', category: 'Recommended', description: 'Sliced ciabatta with garlic butter, broiled until golden and crisp.' },
  // Pizza
  { id: 'it-pz-1', name: 'Margherita', price: 280, emoji: '🍕', tone: '#6E2F2C', category: 'Pizza', description: 'Tomato, mozzarella, fresh basil. The original.', bestseller: true },
  { id: 'it-pz-2', name: 'Pepperoni', price: 360, emoji: '🍕', tone: '#6E2F2C', category: 'Pizza', description: 'Tomato, mozzarella, spicy pork pepperoni slices.' },
  { id: 'it-pz-3', name: 'BBQ Chicken', price: 380, emoji: '🍕', tone: '#6B3A1E', category: 'Pizza', description: 'Smoky BBQ base, grilled chicken, red onion, fresh coriander.' },
  { id: 'it-pz-4', name: 'Four Cheese', price: 420, emoji: '🍕', tone: '#6B5320', category: 'Pizza', description: 'Mozzarella, parmesan, gorgonzola and provolone. Rich and indulgent.' },
  { id: 'it-pz-5', name: 'Veggie Supreme', price: 320, emoji: '🍕', tone: '#3A6B3A', category: 'Pizza', description: 'Bell peppers, mushroom, olive, red onion and jalapeño.' },
  { id: 'it-pz-6', name: 'White Garlic Pizza', price: 340, emoji: '🍕', tone: '#6B5320', category: 'Pizza', description: 'No tomato. Roasted garlic cream base with ricotta, spinach and parmesan.' },
  // Pasta
  { id: 'it-pa-1', name: 'Penne Arrabbiata', price: 260, emoji: '🍝', tone: '#6E2F2C', category: 'Pasta', description: 'Spicy tomato-garlic sauce with fresh chilli.' },
  { id: 'it-pa-2', name: 'Spaghetti Bolognese', price: 300, emoji: '🍝', tone: '#6E2F2C', category: 'Pasta', description: 'Slow-cooked beef and tomato ragù with parmesan.' },
  { id: 'it-pa-3', name: 'Pasta Aglio e Olio', price: 240, emoji: '🍝', tone: '#6B5320', category: 'Pasta', description: 'Olive oil, roasted garlic, chilli flakes, parsley. Deceptively simple.' },
  { id: 'it-pa-4', name: 'Pesto Fusilli', price: 280, emoji: '🍝', tone: '#3A6B3A', category: 'Pasta', description: 'Fusilli with Genovese basil pesto and toasted pine nuts.' },
  { id: 'it-pa-5', name: 'Fettuccine Alfredo', price: 300, emoji: '🍝', tone: '#6B5320', category: 'Pasta', description: 'Butter and parmesan cream sauce. Classically simple, unashamedly rich.' },
  { id: 'it-pa-6', name: 'Arrabiata Chicken Pasta', price: 320, emoji: '🍝', tone: '#6E2F2C', category: 'Pasta', description: 'Penne with grilled chicken in a spicy tomato masala base.' },
  // Starters
  { id: 'it-st-1', name: 'Bruschetta', price: 160, emoji: '🍞', tone: '#6B5320', category: 'Starters', description: 'Grilled bread topped with tomato, basil and extra-virgin olive oil.' },
  { id: 'it-st-2', name: 'Burrata', price: 280, emoji: '🧀', tone: '#5E4A1E', category: 'Starters', description: 'Fresh burrata with cherry tomatoes, rocket and aged balsamic.' },
  { id: 'it-st-3', name: 'Caesar Salad', price: 240, emoji: '🥗', tone: '#3A6B3A', category: 'Starters', description: 'Romaine, parmesan, croutons, house Caesar dressing.' },
  { id: 'it-st-4', name: 'Caprese', price: 260, emoji: '🍅', tone: '#6E2F2C', category: 'Starters', description: 'Buffalo mozzarella, heirloom tomato, fresh basil and olive oil.' },
  { id: 'it-st-5', name: 'Focaccia', price: 160, emoji: '🫓', tone: '#6B5320', category: 'Starters', description: 'Rosemary and sea salt focaccia, baked soft with an olive oil crust.' },
  // Desserts
  { id: 'it-ds-1', name: 'Tiramisu', price: 200, emoji: '🍰', tone: '#5E3A22', category: 'Desserts', description: 'The original. Espresso, mascarpone, cocoa. No shortcuts.', bestseller: true },
  { id: 'it-ds-2', name: 'Panna Cotta', price: 180, emoji: '🍮', tone: '#5E4A1E', category: 'Desserts', description: 'Vanilla cream with a passion fruit coulis.' },
  { id: 'it-ds-3', name: 'Affogato', price: 160, emoji: '🍨', tone: '#4A3A2E', category: 'Desserts', description: 'Vanilla gelato with a shot of hot espresso poured over.' },
  { id: 'it-ds-4', name: 'Cannoli (2 pcs)', price: 160, emoji: '🥐', tone: '#6B5320', category: 'Desserts', description: 'Crispy pastry tubes filled with sweet ricotta and chocolate chips.' },
  // Drinks
  { id: 'it-dr-1', name: 'Americano', price: 120, emoji: '☕', tone: '#4A3A2E', category: 'Drinks', description: 'Double espresso diluted with hot water.' },
  { id: 'it-dr-2', name: 'Cappuccino', price: 150, emoji: '☕', tone: '#4A3A2E', category: 'Drinks', description: 'Espresso, steamed milk, microfoam. Classic.' },
  { id: 'it-dr-3', name: 'Sparkling Water (500ml)', price: 80, emoji: '💧', tone: '#3A4A6B', category: 'Drinks', description: 'San Pellegrino or similar imported sparkling water.' },
  { id: 'it-dr-4', name: 'Fresh Orange Juice', price: 160, emoji: '🍊', tone: '#7A5A22', category: 'Drinks', description: 'Squeezed to order. Four large oranges per glass.' },
]

const CHINESE: MenuItem[] = [
  // Recommended
  { id: 'ch-rec-1', name: 'Chicken Manchurian', price: 280, emoji: '🍗', tone: '#4E4636', category: 'Recommended', description: 'Crispy fried chicken in a tangy, sticky Manchurian sauce. Order this first.', bestseller: true },
  { id: 'ch-rec-2', name: 'Hakka Noodles', price: 220, emoji: '🍜', tone: '#4E4636', category: 'Recommended', description: 'Stir-fried noodles with vegetables in dark soy. Veg or chicken option.', bestseller: true },
  { id: 'ch-rec-3', name: 'Veg Momos (8 pcs)', price: 150, emoji: '🥟', tone: '#4E4636', category: 'Recommended', description: 'Steamed dumplings with cabbage, carrot and ginger filling.', bestseller: true },
  { id: 'ch-rec-4', name: 'Egg Fried Rice', price: 210, emoji: '🍳', tone: '#5E4A1E', category: 'Recommended', description: 'Wok-tossed rice with egg, spring onion and soy. The reliable choice.' },
  { id: 'ch-rec-5', name: 'Spring Rolls (4 pcs)', price: 160, emoji: '🌯', tone: '#6B5320', category: 'Recommended', description: 'Crispy rolls with shredded vegetable filling and sweet chilli dip.' },
  // Momos
  { id: 'ch-mo-1', name: 'Veg Momos (8 pcs)', price: 150, emoji: '🥟', tone: '#4E4636', category: 'Momos & Dim Sum', description: 'Steamed cabbage-carrot dumplings with red chilli dip.', bestseller: true },
  { id: 'ch-mo-2', name: 'Chicken Momos (8 pcs)', price: 180, emoji: '🥟', tone: '#4E4636', category: 'Momos & Dim Sum', description: 'Steamed chicken dumplings in a thin skin. Juicy inside.' },
  { id: 'ch-mo-3', name: 'Pan-Fried Momos', price: 190, emoji: '🥟', tone: '#5E4A1E', category: 'Momos & Dim Sum', description: 'Crispy bottomed, steam-cooked inside. Better than steamed, we said it.' },
  { id: 'ch-mo-4', name: 'Jhol Momos', price: 200, emoji: '🥟', tone: '#7A3E22', category: 'Momos & Dim Sum', description: 'Momos floating in a spicy tomato-sesame broth. Warming.' },
  // Noodles
  { id: 'ch-no-1', name: 'Veg Hakka Noodles', price: 200, emoji: '🍜', tone: '#4E4636', category: 'Noodles', description: 'Stir-fried noodles with carrot, cabbage and spring onion.' },
  { id: 'ch-no-2', name: 'Chicken Hakka Noodles', price: 240, emoji: '🍜', tone: '#4E4636', category: 'Noodles', description: 'Same as veg but with shredded chicken tossed in.' },
  { id: 'ch-no-3', name: 'Schezwan Noodles', price: 230, emoji: '🍜', tone: '#7A3E22', category: 'Noodles', description: 'Extra spicy Sichuan-style. Not for the faint-hearted.' },
  { id: 'ch-no-4', name: 'Singapore Noodles', price: 250, emoji: '🍜', tone: '#6B5320', category: 'Noodles', description: 'Thin rice noodles with curry powder, egg and vegetables.' },
  // Rice
  { id: 'ch-ri-1', name: 'Veg Fried Rice', price: 190, emoji: '🍚', tone: '#5E4A1E', category: 'Rice', description: 'Wok-tossed rice with carrot, peas, corn and soy.' },
  { id: 'ch-ri-2', name: 'Egg Fried Rice', price: 210, emoji: '🍳', tone: '#5E4A1E', category: 'Rice', description: 'Classic comfort. Scrambled egg, spring onion, soy.' },
  { id: 'ch-ri-3', name: 'Chicken Fried Rice', price: 240, emoji: '🍚', tone: '#4E4636', category: 'Rice', description: 'Chicken, egg, vegetables, dark soy. Wok breath included.' },
  { id: 'ch-ri-4', name: 'Schezwan Fried Rice', price: 230, emoji: '🌶️', tone: '#7A3E22', category: 'Rice', description: 'Spicy version with the signature red Sichuan sauce.' },
  // Starters
  { id: 'ch-st-1', name: 'Gobi Manchurian', price: 200, emoji: '🥦', tone: '#3A6B3A', category: 'Starters & Mains', description: 'Crispy cauliflower florets in tangy Manchurian sauce. Addictive.', bestseller: true },
  { id: 'ch-st-2', name: 'Chicken Manchurian', price: 280, emoji: '🍗', tone: '#4E4636', category: 'Starters & Mains', description: 'Crispy chicken in a dark, sticky Manchurian gravy.' },
  { id: 'ch-st-3', name: 'Chilli Paneer', price: 240, emoji: '🧀', tone: '#7A3E22', category: 'Starters & Mains', description: 'Paneer with bell peppers in a spicy soy-chilli sauce.' },
  { id: 'ch-st-4', name: 'Honey Garlic Chicken', price: 300, emoji: '🍗', tone: '#6B5320', category: 'Starters & Mains', description: 'Fried chicken pieces in a sweet-sticky garlic glaze.' },
  { id: 'ch-st-5', name: 'Crispy Corn', price: 160, emoji: '🌽', tone: '#6B6B1E', category: 'Starters & Mains', description: 'Salt and pepper sweet corn. Simple and absolutely addictive.' },
  { id: 'ch-st-6', name: 'Dragon Chicken', price: 290, emoji: '🌶️', tone: '#7A3E22', category: 'Starters & Mains', description: 'Extra hot chicken with dried red chillies and roasted garlic. Not a bluff.' },
  // Soups
  { id: 'ch-so-1', name: 'Hot and Sour Soup', price: 150, emoji: '🍲', tone: '#4E4636', category: 'Soups', description: 'Classic thick broth with vinegar heat and chilli warmth.' },
  { id: 'ch-so-2', name: 'Sweet Corn Soup', price: 130, emoji: '🌽', tone: '#6B6B1E', category: 'Soups', description: 'Creamy sweet corn with vegetable stock. Mild and comforting.' },
  { id: 'ch-so-3', name: 'Manchow Soup', price: 160, emoji: '🍲', tone: '#4E4636', category: 'Soups', description: 'Thick, spiced soup topped with crispy fried noodles.' },
]

const CAFE: MenuItem[] = [
  // Recommended
  { id: 'ca-rec-1', name: 'Cold Coffee', price: 140, emoji: '🥤', tone: '#4A3A2E', category: 'Recommended', description: 'House blend with ice, whole milk and a touch of sugar. Our most-reordered.', bestseller: true },
  { id: 'ca-rec-2', name: 'Avocado Toast', price: 220, emoji: '🥑', tone: '#3A6B3A', category: 'Recommended', description: 'Sourdough with smashed avocado, poached egg, chilli flakes and feta.' },
  { id: 'ca-rec-3', name: 'Blueberry Cheesecake', price: 200, emoji: '🍰', tone: '#5E3A5E', category: 'Recommended', description: 'New York style on a graham cracker base. Per slice.', bestseller: true },
  { id: 'ca-rec-4', name: 'Butter Croissant', price: 140, emoji: '🥐', tone: '#6B5320', category: 'Recommended', description: 'French butter, laminated properly. Baked fresh every morning.', bestseller: true },
  { id: 'ca-rec-5', name: 'Cappuccino', price: 140, emoji: '☕', tone: '#4A3A2E', category: 'Recommended', description: 'Double espresso, steamed milk, microfoam. The standard against which all others are judged.' },
  // Coffee
  { id: 'ca-cf-1', name: 'Espresso', price: 90, emoji: '☕', tone: '#4A3A2E', category: 'Coffee', description: 'Double shot. Short and intense.' },
  { id: 'ca-cf-2', name: 'Americano', price: 110, emoji: '☕', tone: '#4A3A2E', category: 'Coffee', description: 'Espresso diluted with hot water. Long and clean.' },
  { id: 'ca-cf-3', name: 'Cappuccino', price: 140, emoji: '☕', tone: '#4A3A2E', category: 'Coffee', description: 'One-third espresso, one-third steamed milk, one-third foam.', bestseller: true },
  { id: 'ca-cf-4', name: 'Flat White', price: 150, emoji: '☕', tone: '#4A3A2E', category: 'Coffee', description: 'Stronger than a latte, silkier than a cappuccino. Australian.' },
  { id: 'ca-cf-5', name: 'Latte', price: 150, emoji: '☕', tone: '#4A3A2E', category: 'Coffee', description: 'Espresso with a large amount of steamed milk. Gentle entry point.' },
  { id: 'ca-cf-6', name: 'Cold Coffee', price: 140, emoji: '🥤', tone: '#4A3A2E', category: 'Coffee', description: 'House blend over ice. Whole milk only.', bestseller: true },
  { id: 'ca-cf-7', name: 'Mocha', price: 160, emoji: '☕', tone: '#5E3A22', category: 'Coffee', description: 'Espresso with chocolate syrup and steamed milk.' },
  { id: 'ca-cf-8', name: 'Matcha Latte', price: 180, emoji: '🍵', tone: '#3A6B3A', category: 'Coffee', description: 'Ceremonial grade matcha whisked with oat milk. Earthy and sweet.' },
  // Food
  { id: 'ca-fo-1', name: 'Avocado Toast', price: 220, emoji: '🥑', tone: '#3A6B3A', category: 'Food', description: 'Smashed avocado, poached egg, feta and chilli on sourdough.' },
  { id: 'ca-fo-2', name: 'Grilled Cheese Sandwich', price: 180, emoji: '🥪', tone: '#6B5320', category: 'Food', description: 'Cheddar and mozzarella on thick sourdough. Grilled until the outside is crackling.' },
  { id: 'ca-fo-3', name: 'Club Sandwich', price: 240, emoji: '🥪', tone: '#6B5320', category: 'Food', description: 'Triple-decker with chicken, bacon, egg, tomato and lettuce.' },
  { id: 'ca-fo-4', name: 'Granola Bowl', price: 200, emoji: '🥣', tone: '#6B5320', category: 'Food', description: 'House granola with yogurt, honey and seasonal fresh fruit.' },
  { id: 'ca-fo-5', name: 'Eggs Benedict', price: 280, emoji: '🍳', tone: '#6B5320', category: 'Food', description: 'Poached eggs on brioche with hollandaise. Weekend-brunch energy.' },
  { id: 'ca-fo-6', name: 'Three-Egg Omelette', price: 180, emoji: '🍳', tone: '#6B5320', category: 'Food', description: 'Choose your filling: cheese, mushroom or spinach.' },
  { id: 'ca-fo-7', name: 'BLT', price: 200, emoji: '🥪', tone: '#6B5320', category: 'Food', description: 'Bacon, lettuce, tomato on toasted white with mayo.' },
  // Pastries
  { id: 'ca-pa-1', name: 'Butter Croissant', price: 140, emoji: '🥐', tone: '#6B5320', category: 'Pastries & Desserts', description: 'French butter, laminated 27 times. Baked fresh.', bestseller: true },
  { id: 'ca-pa-2', name: 'Pain au Chocolat', price: 160, emoji: '🥐', tone: '#5E3A22', category: 'Pastries & Desserts', description: 'Same laminated dough with dark chocolate inside.' },
  { id: 'ca-pa-3', name: 'Chocolate Brownie', price: 140, emoji: '🍫', tone: '#5E3A22', category: 'Pastries & Desserts', description: 'Fudgy dark chocolate brownie. Served warm with a scoop option.' },
  { id: 'ca-pa-4', name: 'Blueberry Muffin', price: 120, emoji: '🫐', tone: '#5E3A5E', category: 'Pastries & Desserts', description: 'Fresh blueberries throughout, crumbly sugar top.' },
  { id: 'ca-pa-5', name: 'Cheesecake (per slice)', price: 200, emoji: '🍰', tone: '#5E3A5E', category: 'Pastries & Desserts', description: 'New York style baked cheesecake. Ask for today\'s topping.', bestseller: true },
  { id: 'ca-pa-6', name: 'Banana Bread', price: 130, emoji: '🍌', tone: '#6B5320', category: 'Pastries & Desserts', description: 'Toasted with butter. Three-banana recipe, genuinely moist.' },
  // Other Drinks
  { id: 'ca-dr-1', name: 'Chai Latte', price: 130, emoji: '🍵', tone: '#6B5320', category: 'Other Drinks', description: 'House-spiced masala chai with steamed whole milk.' },
  { id: 'ca-dr-2', name: 'Fresh Orange Juice', price: 160, emoji: '🍊', tone: '#7A5A22', category: 'Other Drinks', description: 'Squeezed to order. Four large oranges per glass.' },
  { id: 'ca-dr-3', name: 'Sparkling Water (330ml)', price: 90, emoji: '💧', tone: '#3A4A6B', category: 'Other Drinks', description: 'San Pellegrino.' },
  { id: 'ca-dr-4', name: 'Iced Tea', price: 110, emoji: '🍵', tone: '#4A6B3A', category: 'Other Drinks', description: 'House-brewed black tea, lemon, mint. Sweetness on the side.' },
]

const ROLLS: MenuItem[] = [
  // Recommended
  { id: 'ro-rec-1', name: 'Egg Chicken Kathi Roll', price: 190, emoji: '🌯', tone: '#5E4A1E', category: 'Recommended', description: 'Egg-layered paratha with spiced chicken tikka, onion and chutney.', bestseller: true },
  { id: 'ro-rec-2', name: 'Paneer Tikka Roll', price: 160, emoji: '🌯', tone: '#5E4A1E', category: 'Recommended', description: 'Marinated cottage cheese with mint chutney and pickled onion in a paratha.', bestseller: true },
  { id: 'ro-rec-3', name: 'Peri Peri Fries', price: 130, emoji: '🍟', tone: '#6B5320', category: 'Recommended', description: 'Thick-cut fries with peri peri seasoning and a sriracha mayo dip.', bestseller: true },
  { id: 'ro-rec-4', name: 'Bombay Frankie', price: 120, emoji: '🌯', tone: '#5E4A1E', category: 'Recommended', description: 'Street-style spiced potato and egg roll. The Bombay classic.' },
  { id: 'ro-rec-5', name: 'Tandoori Chicken Roll', price: 180, emoji: '🌯', tone: '#7A3E22', category: 'Recommended', description: 'Chargrilled chicken with raw onion, green chutney and lime.' },
  // Chicken Rolls
  { id: 'ro-ch-1', name: 'Chicken Kathi Roll', price: 170, emoji: '🌯', tone: '#5E4A1E', category: 'Chicken Rolls', description: 'Spiced minced chicken in a flaky paratha.' },
  { id: 'ro-ch-2', name: 'Egg Chicken Roll', price: 190, emoji: '🌯', tone: '#5E4A1E', category: 'Chicken Rolls', description: 'Egg-coated paratha with chicken tikka. A Kolkata staple.', bestseller: true },
  { id: 'ro-ch-3', name: 'Tandoori Chicken Roll', price: 180, emoji: '🌯', tone: '#7A3E22', category: 'Chicken Rolls', description: 'Chargrilled chicken with onion, raw chilli and green chutney.' },
  { id: 'ro-ch-4', name: 'Chicken Kebab Roll', price: 200, emoji: '🌯', tone: '#6B3A1E', category: 'Chicken Rolls', description: 'Seekh kebab and caramelised onion relish in a soft paratha.' },
  { id: 'ro-ch-5', name: 'Chicken Frankie', price: 190, emoji: '🌯', tone: '#7A3E22', category: 'Chicken Rolls', description: 'Mumbai-style with tomato sauce, cheese and chilli.' },
  // Veg Rolls
  { id: 'ro-vg-1', name: 'Paneer Tikka Roll', price: 160, emoji: '🌯', tone: '#5E4A1E', category: 'Veg Rolls', description: 'Smoky cottage cheese with mint chutney and pickled onion.' },
  { id: 'ro-vg-2', name: 'Bombay Potato Frankie', price: 120, emoji: '🌯', tone: '#5E4A1E', category: 'Veg Rolls', description: 'Classic spiced potato with egg coating. Original street formula.' },
  { id: 'ro-vg-3', name: 'Aloo Tikki Roll', price: 110, emoji: '🌯', tone: '#6B5320', category: 'Veg Rolls', description: 'Crispy potato patty with green and tamarind chutneys.' },
  { id: 'ro-vg-4', name: 'Mushroom & Cheese Roll', price: 160, emoji: '🌯', tone: '#5E4A1E', category: 'Veg Rolls', description: 'Stir-fried mushrooms with cheddar and chilli mayo in a paratha.' },
  // Sides
  { id: 'ro-si-1', name: 'Peri Peri Fries', price: 130, emoji: '🍟', tone: '#6B5320', category: 'Sides', description: 'Thick-cut with peri peri dust and sriracha mayo.', bestseller: true },
  { id: 'ro-si-2', name: 'Masala Fries', price: 120, emoji: '🍟', tone: '#6B5320', category: 'Sides', description: 'Fries tossed with chaat masala and a squeeze of lime.' },
  { id: 'ro-si-3', name: 'Onion Rings', price: 140, emoji: '🧅', tone: '#6B5320', category: 'Sides', description: 'Beer-battered onion rings. Crispy outside, soft inside.' },
  { id: 'ro-si-4', name: 'Coleslaw', price: 80, emoji: '🥗', tone: '#3A6B3A', category: 'Sides', description: 'Creamy house coleslaw with apple and celery.' },
  // Drinks
  { id: 'ro-dr-1', name: 'Nimbu Pani', price: 70, emoji: '🍋', tone: '#6B6B1E', category: 'Drinks', description: 'Freshly squeezed lime with salt and sugar.' },
  { id: 'ro-dr-2', name: 'Mango Shake', price: 100, emoji: '🥭', tone: '#7A5A22', category: 'Drinks', description: 'Thick mango shake. Alphonso when in season.' },
  { id: 'ro-dr-3', name: 'Thums Up', price: 50, emoji: '🥤', tone: '#3A3A3A', category: 'Drinks', description: 'The original. Strong cola, stronger bubbles.' },
  { id: 'ro-dr-4', name: 'Cold Coffee', price: 110, emoji: '🥤', tone: '#4A3A2E', category: 'Drinks', description: 'Blended with ice and milk. Simple and sweet.' },
]

const GENERIC: MenuItem[] = [
  { id: 'ge-1', name: 'Chicken Biryani', price: 320, emoji: '🍛', tone: '#7A3E22', category: 'Recommended', description: 'Fragrant basmati with spiced chicken and fried onions.', bestseller: true },
  { id: 'ge-2', name: 'Paneer Roll', price: 140, emoji: '🌯', tone: '#5E4A1E', category: 'Recommended', description: 'Marinated cottage cheese with mint chutney in a paratha.' },
  { id: 'ge-3', name: 'Margherita Pizza', price: 260, emoji: '🍕', tone: '#6E2F2C', category: 'Recommended', description: 'Tomato, mozzarella, basil.' },
  { id: 'ge-4', name: 'Masala Dosa', price: 120, emoji: '🥞', tone: '#6B5320', category: 'Recommended', description: 'Crispy rice crepe with spiced potato filling.', bestseller: true },
  { id: 'ge-5', name: 'Veg Momos (8 pcs)', price: 130, emoji: '🥟', tone: '#4E4636', category: 'Snacks', description: 'Steamed dumplings with cabbage and ginger filling.' },
  { id: 'ge-6', name: 'Butter Chicken', price: 340, emoji: '🍗', tone: '#7A3E22', category: 'Mains', description: 'Velvety tomato-butter gravy. Mild spice.', bestseller: true },
  { id: 'ge-7', name: 'Peri Peri Fries', price: 120, emoji: '🍟', tone: '#6B5320', category: 'Snacks', description: 'Thick-cut fries with peri peri seasoning.' },
  { id: 'ge-8', name: 'Gulab Jamun', price: 90, emoji: '🍮', tone: '#5E3A22', category: 'Desserts', description: 'Soft dumplings in rose and cardamom syrup.' },
  { id: 'ge-9', name: 'Hakka Noodles', price: 200, emoji: '🍜', tone: '#4E4636', category: 'Mains', description: 'Stir-fried noodles with vegetables in dark soy.' },
  { id: 'ge-10', name: 'Cold Coffee', price: 110, emoji: '🥤', tone: '#4A3A2E', category: 'Drinks', description: 'Blended over ice. Whole milk.' },
  { id: 'ge-11', name: 'Garlic Naan', price: 80, emoji: '🫓', tone: '#6B5320', category: 'Breads', description: 'Pillowy naan with roasted garlic butter.' },
  { id: 'ge-12', name: 'Paneer Tikka', price: 240, emoji: '🧀', tone: '#5E4A1E', category: 'Snacks', description: 'Smoky cottage cheese with capsicum in yogurt marinade.' },
]

const CUISINE_MENUS: Record<string, MenuItem[]> = {
  'north indian': NORTH_INDIAN,
  mughlai: NORTH_INDIAN,
  biryani: NORTH_INDIAN,
  'south indian': SOUTH_INDIAN,
  dosa: SOUTH_INDIAN,
  udupi: SOUTH_INDIAN,
  italian: ITALIAN,
  pizza: ITALIAN,
  chinese: CHINESE,
  asian: CHINESE,
  cafe: CAFE,
  bakery: CAFE,
  dessert: CAFE,
  coffee_shop: CAFE,
  rolls: ROLLS,
  kathi: ROLLS,
}

const NAME_HINTS: [RegExp, string][] = [
  [/biryani|mughlai|tandoor|kebab/i, 'north indian'],
  [/dosa|udupi|idli|south/i, 'south indian'],
  [/pizza|pasta|italia/i, 'italian'],
  [/chinese|wok|noodle|dragon|panda/i, 'chinese'],
  [/cafe|coffee|bake|patisserie|dessert/i, 'cafe'],
  [/roll|kathi/i, 'rolls'],
]

const NON_VEG_RE = /chicken|mutton|lamb|fish|prawn|shrimp|egg|bacon|beef|pork|pepperoni|keema|meat|seafood|tikka|seekh/i

function isVeg(name: string): boolean {
  if (/paneer/i.test(name)) return true
  return !NON_VEG_RE.test(name)
}

export function guessCuisine(restaurantName: string, osmCuisine?: string): string {
  if (osmCuisine && CUISINE_MENUS[osmCuisine.toLowerCase()]) return osmCuisine.toLowerCase()
  const hit = NAME_HINTS.find(([re]) => re.test(restaurantName))
  return hit ? hit[1] : 'multi-cuisine'
}

export function menuFor(restaurant: Restaurant): MenuItem[] {
  const base = CUISINE_MENUS[restaurant.cuisine] ?? GENERIC
  return base.map((item) => ({
    ...item,
    id: `${restaurant.id}:${item.id}`,
    veg: item.veg !== undefined ? item.veg : isVeg(item.name),
  }))
}
