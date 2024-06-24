import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Share, StyleSheet, FlatList } from 'react-native';

const dayQuotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "In the midst of chaos, there is also opportunity. - Sun Tzu",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill"
];

const nightQuotes = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "Act as if what you do makes a difference. It does. - William James"
];

const RandomQuotesApp: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    generateRandomQuote();
  }, []);

  const isDayTime = (): boolean => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
  };

  const generateRandomQuote = () => {
    const quotes = isDayTime() ? dayQuotes : nightQuotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  const shareQuote = async () => {
    try {
      await Share.share({
        message: quote,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const addFavoriteQuote = () => {
    if (!favorites.includes(quote)) {
      setFavorites([...favorites, quote]);
    }
  };

  const renderFavoriteItem = ({ item }: { item: string }) => (
    <View style={styles.favoriteItem}>
      <Text style={styles.quoteText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Quotes</Text>
      <Text style={styles.quoteText}>{quote}</Text>
      <TouchableOpacity style={styles.button} onPress={generateRandomQuote}>
        <Text style={styles.buttonText}>New Quote</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={shareQuote}>
        <Text style={styles.buttonText}>Share Quote</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={addFavoriteQuote}>
        <Text style={styles.buttonText}>Add to Favorites</Text>
      </TouchableOpacity>
      <Text style={styles.timeText}>{isDayTime() ? "Day Quotes" : "Night Quotes"}</Text>
      <Text style={styles.favoritesTitle}>Favorite Quotes</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  timeText: {
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
  favoritesTitle: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  favoriteItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
});

export default RandomQuotesApp;