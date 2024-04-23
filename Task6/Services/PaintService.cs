using Task6.Interfaces;
using Task6.Models;

namespace Task6.Services
{
    public class PaintService : IPaintService
    {
        private readonly Dictionary<int, List<Figure>> _canvases = new Dictionary<int, List<Figure>>();

        public void AddCanvas()
        {
            _canvases.Add(_canvases.Count, new List<Figure>());
        }

        public void AddFigures(int key, Figure figure)
        {
            _canvases[key].Add(figure);
        }

        public Dictionary<int, List<Figure>> GetAll()
        {
            return _canvases;
        }

        public List<Figure> GetFigures(int key)
        {
            return _canvases[key];
        }
    }
}
