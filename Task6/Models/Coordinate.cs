using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Task6.Models
{
    public class Coordinate
    {
        [Required]
        [JsonPropertyName("startXPercent")]
        public float StartXPercent { get; set; }

        [Required]
        [JsonPropertyName("startYPercent")]
        public float StartYPercent { get; set; }

        [Required]
        [JsonPropertyName("endXPercent")]
        public float EndXPercent { get; set; }

        [Required]
        [JsonPropertyName("endYPercent")]
        public float EndYPercent { get; set; }
    }
}
