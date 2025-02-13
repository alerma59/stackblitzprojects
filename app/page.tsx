"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sword, Shield, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const promises = Array.from({ length: 20 }, (_, i) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((res) =>
            res.json()
          )
        );
        const results = await Promise.all(promises);
        setPokemon(results);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      electric: "bg-yellow-400",
      grass: "bg-green-500",
      ice: "bg-blue-200",
      fighting: "bg-red-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-indigo-400",
      psychic: "bg-pink-500",
      bug: "bg-lime-500",
      rock: "bg-yellow-800",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-700",
      dark: "bg-gray-800",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
    };
    return colors[type] || "bg-gray-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Sword className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold text-primary">PokéBlog</h1>
            <Shield className="w-12 h-12 text-primary" />
          </div>
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search Pokémon..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="p-4 animate-pulse">
                <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPokemon.map((p) => (
              <Link href={`/pokemon/${p.id}`} key={p.id}>
                <Card className="p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                  <div className="relative w-full pt-[100%] bg-accent rounded-lg overflow-hidden mb-4">
                    <img
                      src={p.sprites.other["official-artwork"].front_default}
                      alt={p.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <h2 className="text-xl font-semibold capitalize mb-2">
                    {p.name}
                  </h2>
                  <div className="flex gap-2">
                    {p.types.map((type) => (
                      <span
                        key={type.type.name}
                        className={`px-3 py-1 rounded-full text-sm text-white ${getTypeColor(
                          type.type.name
                        )}`}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}