const ApiURL = process.env.NEXT_PUBLIC_API_URL + "/newsletter"

const handleServerError = (error: any) => {
  console.error(
    "[NEWSLETTER_ERROR]: ",
    error instanceof Error ? error.message : String(error)
  )
  return {
    status: 500,
    error: error instanceof Error ? error.message : "An unknown error occurred",
  }
}

export const postNewsletter = async (email: string) => {
  try {
    const checkEmailResponse = await checkEmail(email)

    if (checkEmailResponse.status === 409) {
      return {
        status: 409,
        error: checkEmailResponse.error || "Email already registered",
      }
    }

    const response = await fetch(ApiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.headers.get("Content-Type")?.includes("application/json")) {
      console.error("Received non-JSON response:", await response.text())
      throw new Error("Unexpected server response.")
    }

    const data = await response.json()

    if (response.ok) {
      return {
        status: 201,
        data,
      }
    } else {
      return {
        status: response.status,
        error: data.message,
      }
    }
  } catch (error) {
    return handleServerError(error)
  }
}

export const deleteNewsletter = async (email: string) => {
  try {
    const checkUnsubscribeEmailResponse = await checkUnSubEmail(email)

    if (checkUnsubscribeEmailResponse.status === 409) {
      return {
        status: 409,
        error:
          checkUnsubscribeEmailResponse.error ||
          "Email not found in newsletter list",
      }
    }

    const response = await fetch(ApiURL + `?email=${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.headers.get("Content-Type")?.includes("application/json")) {
      console.error("Received non-JSON response:", await response.text())
      throw new Error("Unexpected server response.")
    }

    const data = await response.json()

    if (response.ok) {
      return {
        status: 200,
        message: "Email unsubscribed and deleted successfully",
      }
    } else {
      return {
        status: response.status,
        error:
          data.message ||
          "Error occurred while unsubscribing and deleting email",
      }
    }
  } catch (error) {
    return handleServerError(error)
  }
}

export const checkEmail = async (email: string) => {
  try {
    const response = await fetch(ApiURL + `?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.headers.get("Content-Type")?.includes("application/json")) {
      console.error("Received non-JSON response:", await response.text())
      throw new Error("Unexpected server response.")
    }

    const data = await response.json()

    if (response.ok) {
      return {
        status: 201,
        data,
      }
    } else {
      return {
        status: 409,
        error: data.message || "Email already registered",
      }
    }
  } catch (err) {
    console.error(
      "[NEWSLATTER_POST_ERROR]: ",
      err instanceof Error ? err.message : String(err)
    )

    return {
      status: 500,
      error: err instanceof Error ? err.message : "An unknown error occurred",
    }
  }
}

export const checkUnSubEmail = async (email: string) => {
  try {
    const response = await fetch(ApiURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.headers.get("Content-Type")?.includes("application/json")) {
      console.error("Received non-JSON response:", await response.text())
      throw new Error("Unexpected server response.")
    }

    const data = await response.json()

    const matchingEmail = data.find((item: any) => item.email === email)

    if (matchingEmail) {
      return {
        status: 201,
        data: matchingEmail,
      }
    } else {
      return {
        status: 409,
        error: "Email not found in newsletter list",
      }
    }
  } catch (err) {
    console.error(
      "[NEWSLATTER_POST_ERROR]: ",
      err instanceof Error ? err.message : String(err)
    )

    return {
      status: 500,
      error: err instanceof Error ? err.message : "An unknown error occurred",
    }
  }
}
