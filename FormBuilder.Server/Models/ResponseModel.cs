namespace FormBuilder.Server.Models;

public class ResponseModel
{
    public string Message { get; set; }
    public bool IsSuccess { get; set; }
    public object Data { get; set; }

    public static ResponseModel Success(string message = "Operation completed successfully",object data = null )
    {
        return new ResponseModel
        {
            Message = message,
            IsSuccess = true,
            Data = data
        };
    }

    public static ResponseModel Fail(string message = "An error occurred", object data = null)
    {
        return new ResponseModel
        {
            Message = message,
            IsSuccess = false,
            Data = data
        };
    }
}
