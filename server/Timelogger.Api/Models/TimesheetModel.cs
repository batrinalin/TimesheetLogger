using System;

namespace Timelogger.Api.Models
{
    public class TimesheetModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public float? LoggedHours { get; set; }
        public string? DeadLine { get; set; }
    }
}
