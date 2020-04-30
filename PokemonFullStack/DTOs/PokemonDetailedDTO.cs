using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokemonApplication.DTOs
{
    public class PokemonDetailedDTO
    {
        public int PokemonId { get; set; }
        public int PokedexId { get; set; }
        public string Name { get; set; }
        public int HP { get; set; }
        public int Speed { get; set; }
        public int Attack { get; set; }
        public int Defense { get; set; }
        public int SpecialAttack { get; set; }
        public int SpecialDefense { get; set; }
        public int Weight { get; set; }
        public int Height { get; set; }
        public string ImageUrl { get; set; }
        public string AbilityName { get; set; }
        public string Description { get; set; }

        public IList<TypeDTO> TypeDTOs { get; set; }

    }
}
