using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Task6.Enums;

namespace Task6.Models
{
    public class Figure
    {
        [Required]
        [JsonPropertyName("figureType")]
        public FigureEnum FigureType { get; set; }

        [Required]
        [JsonPropertyName("coordinates")]
        public List<Coordinate> Coordinates { get; set; } = null!;
        
        [Required]
        [JsonPropertyName("color")]
        public string Color { get; set; } = null!;
    }
}
