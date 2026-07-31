import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
    const router = useRouter();

    const [EmpID, setEmpID] = useState("");
    const [password, setPassword] = useState("");

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : undefined}
            style={styles.container}>
            <>
                <Stack.Screen options={{ headerShown: false }} />
            </>

            <View style={styles.card}>
                {/* Icon */}
                <Image
                    source={require("/assets/images/logo.png")}
                    style={styles.logo}
                />

                {/* Title */}
                <Text style={styles.title}>ZII</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>

                {/* Employee ID */}
                <Text style={styles.label}>Employee ID</Text>
                <View style={styles.inputBox}>
                    <Ionicons name="person-outline" size={16} color="#888" />
                    <TextInput
                        placeholder="yourname"
                        value={EmpID}
                        onChangeText={setEmpID}
                        style={styles.input}
                    />
                </View>

                {/* Password */}
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputBox}>
                    <Ionicons name="lock-closed-outline" size={16} color="#888" />
                    <TextInput
                        placeholder="••••••••"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                    />
                </View>

                {/* Button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => router.push("/(tabs)")}>Log in</Text>
                </TouchableOpacity>

                {/* Signup
                <Text style={styles.signupText}>
                    Don't have an account?{" "}
                    <Text style={styles.signupLink}>Sign up</Text>
                </Text> */}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
        justifyContent: "center",
        padding: 20,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
    },

    subtitle: {
        textAlign: "center",
        color: "#64748B",
        marginBottom: 5,
    },

    label: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 13,
        color: "#334155",
    },

    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        paddingHorizontal: 10,
        height: 45,
        backgroundColor: "#fff",
    },

    input: {
        flex: 1,
        marginLeft: 8,
    },

    button: {
        marginTop: 20,
        backgroundColor: "#0F172A",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },

    signupText: {
        textAlign: "center",
        marginTop: 15,
        color: "#64748B",
    },

    signupLink: {
        color: "#2563EB",
        fontWeight: "600",
    },

    logo: {
        width: 80,
        height: 80,
        resizeMode: "contain",
        alignSelf: "center",
    }
});