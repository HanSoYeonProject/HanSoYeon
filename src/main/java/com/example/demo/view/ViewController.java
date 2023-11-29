package com.example.demo.view;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ViewController {
    private final BlacklistRepository blacklistRepository;
    private final MatchingRepository matchingRepository;
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;
    private final ProvidersRepository providersRepository;

    @GetMapping("/view/users")
    public String userView(Model model) {
        List<UserEntity> userEntityList = userRepository.findAll();
        model.addAttribute("userEntityList", userEntityList);
        return "users_view";
    }

    @GetMapping("/view/blacklists")
    public String blacklistView(Model model) {
        List<BlacklistEntity> blacklistEntityList = blacklistRepository.findAll();
        model.addAttribute("blacklistEntityList", blacklistEntityList);
        return "blacklists_view";
    }

    @GetMapping("/view/matchings")
    public String matchingView(Model model) {
        List<MatchingEntity> matchingEntityList = matchingRepository.findAll();
        model.addAttribute("matchingEntityList", matchingEntityList);
        return "matchings_view";
    }

    @GetMapping("/view/friendships")
    public String friendshipView(Model model) {
        List<FriendshipEntity> friendshipEntityList = friendshipRepository.findAll();
        model.addAttribute("friendshipEntityList", friendshipEntityList);
        return "friendships_view";
    }

    @GetMapping("/view/providers")
    public String providerView(Model model) {
        List<ProviderEntity> providerEntityList = providersRepository.findAll();
        model.addAttribute("providerEntityList", providerEntityList);
        return "providers_view";
    }
}
