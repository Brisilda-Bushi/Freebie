export async function activateUser(hash) {
  console.log("activateUser");
  const response = await fetch(
    // `http://localhost:4000/api/activate/user/${hash}`
    `${process.env.DOMAIN}/api/activate/user/${hash}`
  );
  console.log("activateUser2");
  if (response.status >= 400) {
    return { message: "Cannot Validate an User!" };
  } else {
    return { message: "Validation Done!" };
  }
}
