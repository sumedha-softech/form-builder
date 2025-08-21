using FormBuilder.Server.Models;

namespace FormBuilder.Server.Application.Middleware;

public class ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception occurred");
            context.Response.StatusCode = 500; 
            context.Response.ContentType = "application/json";
            var errorResponse = ResponseModel.Fail("Something went wrong, please try again later!!");
            await context.Response.WriteAsJsonAsync(errorResponse);
        }
    }
}
