status = "";
input1 = "";
objects = [];
function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(480, 380);
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input1 = document.getElementById("percy_jackson").value;
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}
function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are : "+ objects.length;

            fill("#ff007b");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff007b");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error, results)
{
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}