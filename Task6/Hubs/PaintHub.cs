using Microsoft.AspNetCore.SignalR;
using Task6.Interfaces;
using Task6.Models;

namespace Task6.Hubs
{
    public class PaintHub : Hub
    {
        private readonly IPaintService _paintService;
        public PaintHub(IPaintService paintService)
        {
            _paintService = paintService;
        }

        public async Task Send(Figure figure, int canvas)
        {
            _paintService.AddFigures(canvas, figure);

            await Clients.Others.SendAsync(canvas.ToString(), figure);
        }
    }
}
