using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pokemon_DataAccess.Entity
{
    [Table("Pokemon")]
    public class Pokemon
    {
        [Key]
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
        public int AbilityId { get; set; }
        public string ImageUrl { get; set; }
        
        [ForeignKey("AbilityId")]
        public virtual Ability Ability { get; set; }

        public virtual ICollection<PokemonType> PokemonTypes { get; set; }
    }
}
