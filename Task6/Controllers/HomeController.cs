using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Task6.Interfaces;
using Task6.Models;
using Task6.ViewModels;

namespace Task6.Controllers
{
    public class HomeController : Controller
    {
        private readonly IPaintService _paintService; 

        public HomeController(IPaintService paintService)
        {
            _paintService = paintService;   
        }

        public IActionResult GetCanvasById(int key)
        {
            return Json(_paintService.GetFigures(key));
        }

        public IActionResult GetAll()
        {
            return Json(_paintService.GetAll());
        }

        public IActionResult AddCanvas() 
        { 
            _paintService.AddCanvas();

            return RedirectToAction("Index");   
        }

        public IActionResult Index()
        {
            var canvases = _paintService.GetAll();

            return View(new CanvasesViewModel
            {
                Canvases = canvases
            });
        }

        public IActionResult Canvas(int key)
        {
            Console.WriteLine(key);
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}