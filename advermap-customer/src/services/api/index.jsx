import axios from "axios"
export const PATH={
	SPACE:"/spaces",
	SURFACE:"/surfaces",
	REPORT:"/reports"
}
export const api=axios.create({
	baseURL:"http://localhost:8080/api/v1",
	timeout:5000,
})