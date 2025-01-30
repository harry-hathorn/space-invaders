using System;
using System.ComponentModel.DataAnnotations;

namespace SpaceInvadersGame.Models
{
    public class Score
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string PlayerName { get; set; }

        [Required]
        public int Points { get; set; }

        public DateTime Date { get; set; }
    }
}
