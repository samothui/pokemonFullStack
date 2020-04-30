using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokemonApplication.DTOs
{
    public class PokemonBasicDTO
    {
        public int PokemonId { get; set; }
        public string Name { get; set; }
        public int Weight { get; set; }
        public int Height { get; set; }
        public string ImageUrl { get; set; }

        public IList<TypeDTO> TypeDTOs { get; set; }
    }
}
