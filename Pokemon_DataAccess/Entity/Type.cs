using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pokemon_DataAccess.Entity
{
    [Table("Type")]
    public class Type
    {
        [Key]
        public int TypeId { get; set; }
        public string Name { get; set; }
        public string HexColor { get; set; }

        public virtual ICollection<Pokemon> Pokemons { get; set; }

    }
}
