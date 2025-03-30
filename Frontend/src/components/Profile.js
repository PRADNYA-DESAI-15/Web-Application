import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState({
        username: "",
        phone: "",
        addresses: []
    });

    const [newUsername, setNewUsername] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip_code: ""
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/profile/", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile", error);
        }
    };

    const updateUsername = async () => {
        try {
            await axios.put("http://localhost:8000/api/profile/update-username/",
                { username: newUsername },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setMessage("Username updated successfully! ✅");
            fetchProfile();
        } catch (error) {
            setMessage("Failed to update username ❌");
            console.error("Error updating username", error);
        }
    };

    const updatePhone = async () => {
        try {
            await axios.put("http://localhost:8000/api/profile/update-phone/",
                { phone: newPhone },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setMessage("Phone updated successfully! ✅");
            fetchProfile();
        } catch (error) {
            setMessage("Failed to update phone ❌");
            console.error("Error updating phone", error.response ? error.response.data : error);
        }
    };

    const addAddress = async () => {
        try {
            console.log("Sending address:", newAddress); // Debugging log
            const response = await axios.post("http://localhost:8000/api/profile/address/",
                newAddress,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            console.log("Address added:", response.data);
            setMessage("Address added successfully! ✅");
            fetchProfile();
        } catch (error) {
            setMessage("Failed to add address ❌");
            console.error("Error adding address", error.response ? error.response.data : error);
        }
    };

    const deleteAddress = async (id) => {
        try {
            await axios.delete("http://localhost:8000/api/profile/address/", {
                data: { id },
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setMessage("Address deleted successfully! ✅");
            fetchProfile();
        } catch (error) {
            setMessage("Failed to delete address ❌");
            console.error("Error deleting address", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>User Profile</h2>

            {message && (
                <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
                    {message}
                </div>
            )}

            <div className="card p-3 mb-3">
                <h4>Username: {profile.username}</h4>
                <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Enter new username" />
                <button className="btn btn-primary mt-2" onClick={updateUsername}>Update Username</button>
            </div>

            <div className="card p-3 mb-3">
                <h4>Phone: {profile.phone || "Not set"}</h4>
                <input type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="Enter new phone" />
                <button className="btn btn-primary mt-2" onClick={updatePhone}>Update Phone</button>
            </div>

            <div className="card p-3">
                <h4>Addresses</h4>
                <ul>
                    {profile.addresses.map(address => (
                        <li key={address.id}>
                            {address.street}, {address.city}, {address.state} {address.zip_code}
                            <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteAddress(address.id)}>Delete</button>
                        </li>
                    ))}
                </ul>

                {/* ✅ Added input fields for full address details */}
                <input
                    type="text"
                    placeholder="Street"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Zip Code"
                    value={newAddress.zip_code}
                    onChange={(e) => setNewAddress({ ...newAddress, zip_code: e.target.value })}
                />

                <button className="btn btn-primary mt-2" onClick={addAddress}>Add Address</button>
            </div>
        </div>
    );
};

export default Profile;
