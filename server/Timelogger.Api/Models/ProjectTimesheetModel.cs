namespace Timelogger.Api.Models
{
    public class ProjectTimesheetModel
    {
        public string Name { get; set; }
        public float? LoggedHours { get; set; }
        public string? DeadLine { get; set; }
    }
}
