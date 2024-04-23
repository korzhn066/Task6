using Task6.Models;

namespace Task6.Interfaces
{
    public interface IPaintService
    {
        void AddCanvas();
        Dictionary<int, List<Figure>> GetAll();
        List<Figure> GetFigures(int key);

        void AddFigures(int key, Figure figure);
    }
}
