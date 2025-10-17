import Withdraw from "src/view/pages/withdraw/Withdraw"

const en = {
  app: {
    title: "The Light Cinema"
  },
  inputs: {
    username: `Username`,
    password: 'password',
    phoneNumber: 'Phone Number',
    withdrawPassword: "withdraw Passowrd",
    confirmPassword: 'Confirm Password',
    invitationcode: 'Invitation Code',
    walletaddress: "Wallet Address"
  },

  buttons: {
    login: "Login",
    registerNow: "Register Now",
    signup: "Sign Up",
    start: "Start",
    orders: "Orders",
    submit: "Submit",
    backtohome: "Back To Home",
    confirm: "Confirm",
    logout: "Logout",
    getstarted: "Get Started",
  },
  text: {
    welcome: "Welcome",
    discover: "Discover exclusive offers just for you",
    signin: "Sign In",
    haveaccount: "Already have an account",
    noaccount: "Don't have an account",
    showingnow: "Showing Now",
    comingsoon: "Coming Soon",
    termsconditions: "terms & conditions",
    todayearning: "Today's earnings",
    accountbalance: "Account Balance",
    freezebalance: "Freeze Balance",
    sumbitInformation: "Submit Information",
    order: "Order",
    pending: "Pending",
    completed: "Completed",
    canceled: "Canceled",
    notransaction: "There's no transactions till now!",
    createdtime: "Created time",
    creationtime: "Creation time",
    orderNumber: "Order Number",
    orderamount: "Order amount",
    income: "Income",
    buyerating: "Buyer Ratings",
    uid: "uid",
    promotioncode: "promotion code",
    walletamount: "Wallet Amount",
    creditassesment: "Credit assesment",
    myfinance: "My finance",
    withdraw: "Withdraw",
    validation: "Validation",
    secret: "Secret Phrase",
    mydetails: "My Details",
    profile: "Profile",
    wallet: "Wallet",
    other: "Other",
    customersupport: "Customer Support",
    transaction: "Transaction",
    taskshistory: "Tasks History",
    security: "Security",
    sponsor: `Our security is our top priority, and we want to ensure that you
              are protected from any potential risks. Please be aware that we
              will never request you to send money to an unknown address. Before
              making any payments, we kindly ask you to verify the details with
              us first.`,

  },
  errors: {
    backToHome: "Back to home",
    403: `Sorry, you don't have access to this page`,
    404: "Sorry, the page you visited does not exist",
    500: "Sorry, the server is reporting an error",
    429: "Too many requests. Please try again later.",
    forbidden: {
      message: "Forbidden",
    },
    validation: {
      message: "An error occurred",
    },
    defaultErrorMessage: "Ops, an error occurred",
  },

  withdraw: {
    withdrawamount: "Withdraw Amount",
    Withdrawpassword: "Withdraw Password",
    availablebalance: "Available Balance",
    rules: " Rules Description",
    rule1: "minimum withdraw is $20",
    rule2: "The payment shall be made within 24 hours after withdrawal application is requested",
    rule3: "incomplete daily order submission is subjected to no withdrawal, all products must be submitted for withdrawal"
  },
  profile: {
    profile: "Profile",
    fullname: "Full Name",
    email: "Email",
    phonenumber: "Phone Number",
    country: "Country",
    Invitationcode: "Invitation Code"
  },
  wallet: {
    wallet: "Wallet",
    info: "withdrawal method information",
    username: "Username",
    walletname: 'Wallet name',
    walletaddress: 'Wallet Address',
    note: "Note",
    notedesctiption: "Please be careful when filling out this informations."
  },

  cs: {
    cs: "Customer services",
    note: "if you have any questions or encouter issues, please email us or chat with our online customer support team.",
    contactnow: "Contact Now"
  },
  transaction: {
    transaction: "Transaction",
    all: "All",
    withdraw: "withdraw",
    dposit: "Deposit",
    notransaction: "There's no transactions till now!"
  },
  order: {
    order: "Order",
    completed: "Completed",
    pending: "Pending",
    canceled: "Canceled",
    ordertime: "Order Time",
    ordernumber: "Order Number",
    total: "Total Order amount",
    commission: "Commission",
    return: "Estimated return"

  },

  security: {
    changepassword: "Change Password",
    oldpassword: "Old Password",
    newpassword: "New Password",
    confirmpassword: "Confirm Password",
    note: "Note",
    notedesc: "Please fill out this information carefully"
  },

  auth: {
    tenants: "Workspaces",
    singindesc: "Enter your email and password to sign in",
    signupdesc: "Enter your email and password to sign up",
    profile: {
      title: "Profile",
      success: "Profile successfully updated",
      vip: "Congratulations on subscribing",
    },
    createAnAccount: "Create an account",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password",
    signin: "Sign in",
    signup: "Sign up",
    signout: "Sign out",
    alreadyHaveAnAccount: "Already have an account? Sign in.",
    social: {
      errors: {
        "auth-invalid-provider":
          "This email is already registered to another provider.",
        "auth-no-email": `The email associated with this account is private or inexistent.`,
      },
    },
    signinWithAnotherAccount: "Sign in with another account",
    emailUnverified: {
      message: `Please confirm your email at <strong>{0}</strong> to continue.`,
      submit: `Resend email verification`,
    },
    emptyPermissions: {
      message: `You have no permissions yet. Wait for the admin to grant you privileges.`,
    },
    passwordResetEmail: {
      message: "Send password reset email",
      error: `Email not recognized`,
    },
    passwordReset: {
      message: "Reset password",
    },
    passwordChange: {
      title: "Change Password",
      success: "Password successfully changed",
      mustMatch: "Passwords must match",
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
    verificationEmailSuccess: `Verification email successfully sent`,
    passwordResetEmailSuccess: `Password reset email successfully sent`,
    passwordResetSuccess: `Password successfully changed`,
    verifyEmail: {
      success: "Email successfully verified.",
      message: "Just a moment, your email is being verified...",
    },
  },


  tabbarmenue: {
    home: "Home",
    rate: "Rate",
    profile: "Profile"
  },

  validation: {
    mixed: {
      default: "${path} is invalid",
      required: "${path} is required",
      oneOf: "${path} must be one of the following values: ${values}",
      notOneOf: "${path} must not be one of the following values: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} must be a ${type}`;
      },
    },
    string: {
      length: "${path} must be exactly ${length} characters",
      min: "${path} must be at least ${min} characters",
      max: "${path} must be at most ${max} characters",
      matches: '${path} must match the following: "${regex}"',
      email: "${path} must be a valid email",
      url: "${path} must be a valid URL",
      trim: "${path} must be a trimmed string",
      lowercase: "${path} must be a lowercase string",
      uppercase: "${path} must be a upper case string",
      selected: "${path} must be selected",
    },
    number: {
      min: "${path} must be greater than or equal to ${min}",
      max: "${path} must be less than or equal to ${max}",
      lessThan: "${path} must be less than ${less}",
      moreThan: "${path} must be greater than ${more}",
      notEqual: "${path} must be not equal to ${notEqual}",
      positive: "${path} must be a positive number",
      negative: "${path} must be a negative number",
      integer: "${path} must be an integer",
    },
    date: {
      min: "${path} field must be later than ${min}",
      max: "${path} field must be at earlier than ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} field cannot have keys not specified in the object shape",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} is required`
          : `${path} field must have at least ${min} items`,
      max: "${path} field must have less than or equal to ${max} items",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Upload",
    image: "You must upload an image",
    size: "File is too big. Max allowed size is {0}",
    formats: `Invalid format. Must be one of: {0}.`,
  },

}
export default en