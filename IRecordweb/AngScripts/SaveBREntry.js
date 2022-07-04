var app = angular.module("myApp", ["ngStorage"]);
app.controller("myctrn", function ($scope, $http, $localStorage, $sessionStorage, $window) {
    // $scope.BILLS = null;
    $scope.PageLoad = function () {
        debugger;
        //  $scope.bindbills();
        $("#ddlInvestmentType").focus();
        $scope.GetDemate();
        $scope.getConsultant();
        $scope.getBroker();
        $scope.GetAllDemate();
        $scope.GetAllConsultant();
        //$scope.GetAllBroker();
        $scope.Brokers = [];
        $scope.demat_with_broker = [];
        $scope.Single_demats = [];
        $scope.Single_Bank = [];
        $scope.Single_Advisor = [];
        $scope.ddlInvestmentType = "0";
        $scope.SaveBREntry = {};
        $scope.details = [];

        $scope.btntext = "Save";

        //fnGetDataUsingGetRequestWithModel("/BrokerBillEntry/GetAllBroker", "Brokers", $scope, $http);
        $http({
            method: "get",
            url: "/BrokerBillEntry/GetAllBroker"
        }).then(function (response) {
            $scope.Brokers = JSON.parse(response.data);
            $scope.Fn_GetAsDefaultSetting();
        }, function (data) {
            //deferred.reject({ message: "Really bad" });
            alert("Error Occur During This Request" + geturl);
        })



        // $scope.FilepathUrl = "/CN_SampleFile/AngelBrokingLimitedEQUITY.pdf";
        // $scope.userselectedFilePath = "/CN_SampleFile/AngelBrokingLimitedEQUITY.pdf";
        //  $scope.SaveBREntry = [];
        //$("#ddlInvestmentType").val("0");

        //$sessionStorage.SessionMessage = "hii";
        //alert(""+$sessionStorage.SessionMessage)


    }

    document.getElementById('contractnotefile').onchange = function () {
        //var x = document.getElementById("contractnotefile").value;
        //$scope.userselectedFilePath = x;
        //alert($scope.userselectedFilePath);

        var img = document.getElementById('contractnotefile').files[0];
        var reader = new FileReader();
        reader.onloadend = function () {



            $("#userpdf").attr("Src", reader.result);
            $("#btn_Verify").show();


        }
        reader.readAsDataURL(img);
    };


    $("#ddlInvestmentType").on("change", function () {
        $scope.ddlInvestmentType = $(this).val();
        if ($scope.ddlInvestmentType == "0" || $scope.ddlInvestmentType == "1") {
            $("#Demat_Ac_Id").prop("disabled", false);
            $("#ddlHoldingType").prop("disabled", false);
        }
        else {
            $("#Demat_Ac_Id").prop("disabled", true);
            $("#ddlHoldingType").prop("disabled", true);
        }
        $scope.Fn_GetAsDefaultSetting();
    });

    //$scope.showhidefn = function () {
    //    if ($scope.ddlInvestmentType == "0" || $scope.ddlInvestmentType == "1") {
    //        $("#Demat_Ac_Id").prop("disabled", false);
    //        $("#ddlHoldingType").prop("disabled", false);
    //    }
    //    else {
    //        $("#Demat_Ac_Id").prop("disabled", true);
    //        $("#ddlHoldingType").prop("disabled", true);
    //    }
    //    $scope.Fn_GetAsDefaultSetting();
    //}
    $scope.ngclickDropdown = function () {

        //   alert($scope.ContractNoteId);
        for (var i = 0; i <= $scope.BILLS.length; i++) {

            if ($scope.ContractNoteId == $scope.BILLS[i].ID) {
                // alert($scope.BILLS[i].NAME);
                $scope.FilepathUrl = $scope.BILLS[i].SampleFilePath;
                break;
            }
        }
    }
    $scope.BrokerOnchange = function () {
        debugger;
        for (var i = 0; i <= $scope.Brokers.length; i++) {

            if ($scope.ddlBroker === $scope.Brokers[i].ID) {

                // alert($scope.Brokers[i].DefaultDemate);
                $("#Demat_Ac_Id").val($scope.Brokers[i].DefaultDemate);
                //  $scope.SaveBREntry.Demat_Ac_Id = ;
                // console.log($scope.Info_Broker[i].NAME + " FOUND forif" + true);
                //alert("FOUND AND DELETE " + $scope.Info_Broker[i].NAME);
                // $("#selectbrokerpopup").select2("val", "");
                //  $scope.Info_Broker.splice(i, 1)
                break;
            }

        }
        //   alert("hii");
    }
    $scope.btnupload = function () {

        if ($("#txt_Date").val() == "") {
            alert("Please Select A Date!");
            $("#txt_Date").focus();
            return false;
        }


        let photo = document.getElementById("contractnotefile").files[0];
        if (typeof photo !== 'undefined') {


            let formData = new FormData();

            formData.append("photo", photo);
            fetch('/BrokerBillEntry/Upload', { method: "POST", body: formData }).then(function () {

                alert("File Upload successfully");
                $scope.btn_click_sumit();
            });
            $scope.btnupload = false;
        }
        else {
            // $("#ContractNoteId1").val("912");
            // $scope.ContractNoteId = "912";
            // alert($scope.SaveBREntry.ContractNoteId);
            alert("Please Select A files");
            return false;
        }

    };


    $scope.getConsultant = function () {
        fnGetDataUsingGetRequestWithModel("/BrokerBillEntry/GetConsultant", "Info_Consultant", $scope, $http);
    }

    $("#ddlBroker").on("change", function () {
        debugger;
        $('#ddlBroker').select2('destroy');
        $('#ddlBroker').val($(this).val()).select2();
        fnGetDataUsingGetRequestWithModel("/BrokerBillEntry/GetAllBILLS?Invtype=" + $("#ddlInvestmentType").val() + "&&BrokerID=" + $("#ddlBroker").val(), "BILLS", $scope, $http);
        $scope.BrokerOnchange();
    });

    //$scope.bindbills = function () {


    //    //$http({
    //    //    method: "get",
    //    //    url: "/BrokerBillEntry/GetAllBILLS"
    //    //}).then(function (response) {
    //    //    $scope.BILLS = JSON.parse(response.data);

    //    //   // $scope.ContractNoteId = "912";
    //    //}, function (data) {
    //    //    //deferred.reject({ message: "Really bad" });
    //    //    alert("Error Occur During This Request" + geturl);
    //    //}).then(function() {
    //    //    //$("#ContractNoteId1").val("912");

    //    //})

    //    fnGetDataUsingGetRequestWithModel("/BrokerBillEntry/GetAllBILLS?Invtype=" + $("#ddlInvestmentType").val() + "&&BrokerID=" + $("#ddlBroker").val(), "BILLS", $scope, $http);
    //    $scope.BrokerOnchange();
    //}
    $scope.GetAllConsultant = function () {
        fnGetDataUsingGetRequestWithModel("/BrokerBillEntry/GetAllConsultant", "Consultants", $scope, $http);

    }
    $scope.GetDemate = function () {
        fnGetDataUsingGetRequestWithModel("/BrokerBillEntry/GetDemate", "Info_Demate", $scope, $http);
        //alert(11);
    }
    $scope.GetAllDemate = function () {
        fnGetDataUsingGetRequestWithModel("/BrokerBillEntry/GetAllDemate", "Demates", $scope, $http);
        // console.log($scope.Demates);
    }
    $scope.getBroker = function () {
        fnGetDataUsingGetRequestWithModel("/BrokerBillEntry/GetBroker", "Info_Broker", $scope, $http);
    }
    $scope.GetAllBroker = function () {
        fnGetDataUsingGetRequestWithModel("/BrokerBillEntry/GetAllBroker", "Brokers", $scope, $http);

    }
    $scope.Fn_GetAsDefaultSetting = function () {
        //fnGetDataUsingGetRequestWithModel("/BrokerBillEntry/GetAllBroker", "Brokers", $scope, $http);
        $http({
            method: "get",
            url: "/BrokerBillEntry/Get_Set_As_Default?SegmentId=" + $scope.ddlInvestmentType
        }).then(function (response) {
            debugger;
            $scope.DefaultData = JSON.parse(response.data);
            $scope.ddlBroker = $scope.DefaultData[0].BrokerId;

            $http({
                method: "get",
                url: "/BrokerBillEntry/GetAllBILLS?Invtype=" + $("#ddlInvestmentType").val() + "&&BrokerID=number:" + $scope.DefaultData[0].BrokerId
            }).then(function (response1) {
                $scope.BILLS = JSON.parse(response1.data);

                $scope.SaveBREntry.Demat_Ac_Id = $scope.DefaultData[0].DematId.toString();
                //$scope.ddlHoldingType = $scope.DefaultData[0].HoldingTypeId;
                $("#ddlHoldingType").val($scope.DefaultData[0].HoldingTypeId);
                $scope.ddlConsultant = $scope.DefaultData[0].ConsultantId;
                $scope.ContractNoteId = $scope.DefaultData[0].FormatSr_No.toString();
                $scope.SaveBREntry.Password = $scope.DefaultData[0].Password.toString();
                $scope.ngclickDropdown();

            }, function (data) {
                //deferred.reject({ message: "Really bad" });
                alert("Error Occur During This Request" + geturl);
            })

            // $scope.bindbills();

        }, function (data) {
            //deferred.reject({ message: "Really bad" });
            alert("Error Occur During This Request" + geturl);
        })
    }
    $scope.Fn_SetAsDefaultSetting = function () {
        debugger;
        if ($scope.SaveBREntry.ChkSetAsDefault == true) {

            var data_Index = {};
            data_Index.ddlInvestmentType = $scope.ddlInvestmentType;
            data_Index.ddlBroker = $scope.ddlBroker;
            try {
                data_Index.Demat_Ac_Id = $scope.SaveBREntry.Demat_Ac_Id;
                data_Index.ddlHoldingType = $("#ddlHoldingType").val();
            } catch {
            }

            data_Index.ddlConsultant = $scope.ddlConsultant;
            data_Index.ContractNoteId = $scope.ContractNoteId;
            data_Index.Password = $scope.SaveBREntry.Password;
            var Pdata = new FormData();
            Pdata.append("JsonData", '[' + JSON.stringify(data_Index) + ']');


            $.ajax({
                type: "POST",
                url: "/BrokerBillEntry/Set_Set_As_Default",
                type: 'POST',
                data: Pdata,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    //show content
                    //  alert("Insert Data Successfully");
                    //  window.location.href = "/OpeningStock/ViewOpeningStock";

                }
            });

        }

    }

    // New Function added By Poonam for Broker on 03 May 2022

    $scope.FN_demat_with_broker = function () {

        if ($("#selectbrokerpopup").val() != "") {

            var VIEWMODEL = {};
            VIEWMODEL.ID = $("#selectbrokerpopup").val();
            VIEWMODEL.NAME = fnGetddlText("selectbrokerpopup");

            $scope.Brokers.push(VIEWMODEL);

            //NOT IN CASE
            for (var i = 0; i <= $scope.Info_Broker.length; i++) {
                if ($("#selectbrokerpopup").val().split(':')[1] == $scope.Info_Broker[i].ID) {

                    $scope.Info_Broker.splice(i, 1)
                    break;
                }

            }

            $("#selectbrokerpopup").select2();
        }
        else {
            alert("Plase Select Broker..");
            $("#selectbrokerpopup").focus();

        }

    }


    $scope.FN_demat = function () {
        debugger;
        if ($("#ddl_Single_demat").val() != "") {
            var VIEWMODEL = {};
            VIEWMODEL.ID = $("#ddl_Single_demat").val();
            VIEWMODEL.NAME = fnGetddlText("ddl_Single_demat");

            $scope.Demates.push(VIEWMODEL);
            for (var i = 0; i <= $scope.Info_Demate.length; i++) {
                if ($("#ddl_Single_demat").val().split(':')[1] == $scope.Info_Demate[i].ID) {

                    // $("#ddl_Single_demat").select2("val", "");

                    $scope.Info_Demate.splice(i, 1)
                    break;
                }

            }

            $("#ddl_Single_demat").select2();
        }
        else {
            alert("Plase Select Demat..");
            $("#ddl_Single_demat").focus();
            return false;

        }

    }

    $scope.AddConsultant = function () {
        if ($("#ddl_Single_Consultant").val() != "") {
            var VIEWMODEL = {};
            VIEWMODEL.ID = $("#ddl_Single_Consultant").val();
            VIEWMODEL.NAME = fnGetddlText("ddl_Single_Consultant");

            $scope.Consultants.push(VIEWMODEL);
            for (var i = 0; i <= $scope.Info_Consultant.length; i++) {
                if ($("#ddl_Single_Consultant").val().split(':')[1] == $scope.Info_Consultant[i].ID) {

                    // $("#ddl_Single_demat").select2("val", "");

                    $scope.Info_Consultant.splice(i, 1)
                    break;
                }

            }

            $("#ddl_Single_Consultant").select2();
        }
        else {
            alert("Plase Select Demat..");
            $("#ddl_Single_Consultant").focus();
            return false;

        }

    }
    //End here    


    $scope.btn_click_sumit = function () {
        debugger;
        $scope.Fn_SetAsDefaultSetting();

        $scope.btntext = "Please Wait.."
        $("#loader-1").show();

        var text = fnGetddlText("ContractNoteId")
        $scope.SaveBREntry.ContractNoteName = text;
        $scope.SaveBREntry.ContractNoteId = $scope.ContractNoteId;
        $scope.SaveBREntry.Date = $("#txt_Date").val();
        try {
            text = fnGetddlText("Demat_Ac_Id")

        } catch {
            text = "";
        }

        $scope.SaveBREntry.Demat_Ac_Name = text;
        $scope.SaveBREntry.invstyp = $scope.ddlInvestmentType;
        $scope.SaveBREntry.Demat_Ac_Id = $("#Demat_Ac_Id").val();
        $scope.SaveBREntry.Broker_Id = $scope.ddlBroker;
        $scope.SaveBREntry.Broker_Name = fnGetddlText("ddlBroker");
        ////
        $sessionStorage.TypeOfInvst = $scope.ddlInvestmentType;
        ////
        $scope.SaveBREntry.invstyptext = fnGetddlText("ddlInvestmentType");
        $scope.SaveBREntry.ConsultantCode = $scope.ddlConsultant;
        $scope.SaveBREntry.Consultant = fnGetddlText("ddlConsultant");
        $scope.SaveBREntry.HoldingTypeCode = $("#ddlHoldingType").val();
        $scope.SaveBREntry.HoldingType = fnGetddlText("ddlHoldingType");
        // var ListOfDemate = JSON.stringify($scope.Single_demats);
        $sessionStorage.SessionSaveBREntry = $scope.SaveBREntry;
        //fnPostDataUsingPostRequestWithModel("/BrokerBillEntry/SaveBREntry", "SaveBREntry", $scope, $http);

        var DefaultValues = {};
        DefaultValues.Broker = $("#ddlBroker").val();
        DefaultValues.Demate = $("#Demat_Ac_Id").val();
        DefaultValues.Consultant = $("#ddlConsultant").val();

        var ListOfBroker = JSON.stringify($scope.Brokers);
        var ListOfDemate = JSON.stringify($scope.Demates);
        var ListOfConsultant = JSON.stringify($scope.Consultants);
        var JsonDefaultValues = JSON.stringify(DefaultValues);
        //New Code Added by Poonam On 11 May 2022
        var posturl = "/BrokerBillEntry/SetMultiConfiguration";
        $http({
            method: "post",
            url: posturl,
            data: { 'JsonDefaultValues': '[' + JsonDefaultValues + ']', 'ListOfBroker': ListOfBroker, 'ListOfDemate': ListOfDemate, 'ListOfConsultant': ListOfConsultant }
        }).then(function (response) {
            document.getElementById("signupform").submit();


            //  window.location.href="/Dashboard/Index";
            // $scope.GetAllMember();
        }, function (data) {
            alert("Error Occur During This Request" + posturl);
        });

        //End Here


        $http({
            method: "post",
            url: "/BrokerBillEntry/SaveBREntry",
            data: $scope.SaveBREntry
        }).then(function (response) {

            window.location.href = "/BrokerBillEntry/BRDetails";
            //$scope[DynamicFiled] = JSON.parse(response.data);
        }, function (data) {

            alert("Error Occur During This Request" + geturl);
        })


        //window.location.href = "/BrokerBillEntry/BRDetails";

    }
    //$scope.bindstate = function () {
    //    fnGetDataUsingGetRequestWithModel("/Home/GetAllState", "liststates", $scope, $http);
    //};
    //$scope.bindcity = function (id) {
    //    fnGetDataUsingGetRequestWithModel("/Home/GetCityByid?id=" + id, "listCitys", $scope, $http);
    //};
    //$scope.GetValue = function () {
    //    $scope.bindcity($scope.EmpModel.Stateid);
    //}
    //$scope.Getcitytext = function () {
    //    var text = fnGetddlText("ddl_City")
    //    $scope.EmpModel.Address = text;
    //}
    //$scope.GetEmps = function () {
    //    fnGetDataUsingGetRequestWithModel("/Home/GetAllEmp", "listemps", $scope, $http);
    //};
    //$scope.fnclare = function () {
    //    $scope.EmpModel.Stateid = "";
    //    $scope.EmpModel.CityId = "";
    //    $scope.EmpModel.Name = "";
    //    $scope.EmpModel.Address = "";
    //}

});

