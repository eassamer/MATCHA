import { NextResponse } from "next/server";

export async function GET() {
  try {
    fetch("https://ipapi.co/json/")
      .then(function (response) {
        response.json().then((jsonData) => {
          console.log(jsonData);
        });
      })
      .catch(function (error) {
        console.log(error);
      });  
  } catch (error) {
    console.error("Error fetching location data:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching location data" },
      { status: 500 }
    );
  }
}
