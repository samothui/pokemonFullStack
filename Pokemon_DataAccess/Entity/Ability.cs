using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pokemon_DataAccess.Entity
{
    [Table("Ability")]
    public class Ability
    {
        [Key]
        public int AbilityId { get; set; }
        public string AbilityName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Pokemon> Pokemons { get; set; }
    }
}
