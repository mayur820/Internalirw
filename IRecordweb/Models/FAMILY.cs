using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRecordweb.Models
    {
    public class FAMILY
        {
        public class Rootobject
            {
            public Datum[] Data { get; set; }
            }

        public class Datum
            {
            public int FamilyID { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }
            public int UserId { get; set; }
            public bool Active { get; set; }
            public int CreatedBy { get; set; }
            public DateTime CreatedDate { get; set; }
            public object ModifiedBy { get; set; }
            public object ModifiedDate { get; set; }
            }

        }
    }